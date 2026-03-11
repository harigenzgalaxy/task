  import React, { useState, useEffect, useRef } from "react";
  import { useParams } from "react-router-dom";
  import {
    Heart,
    Download,
    X,
    ChevronDown,
    MapPin,
    Mail,
    Phone,
    Globe,
    Loader2,
    ChevronLeft
  } from "lucide-react";
  import Masonry from "react-masonry-css";
  import Lightbox from "yet-another-react-lightbox";
  import "yet-another-react-lightbox/styles.css";
  import { accessSharedGallery, downloadImagesAsZip, downloadSingleImage, verifyClientPassword, toggleClientFavorite, getClientFavorites } from "../../services/galleryService";
  import { Success } from '../../Components/Success'
  import { Error } from '../../Components/Error'
  import "./MasonryGallery.css"; // Import the CSS file
import { GalleryToolbar } from "./GalleryToolbar";
import { GalleryModals } from "./GalleryModals";
import { LikedPhotosModal } from "./LikedPhotosModal";
import { Blurhash } from 'react-blurhash';
import { GooglePhotosSuccessModal } from "./GooglePhotosSuccessModal";
import { GooglePhotosErrorModal } from "./GooglePhotosErrorModal";

// Helper component to handle loading state and blurhash rendering
const BlurhashImage = ({ src, alt, blurhash, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // If we don't have dimensions (old events), we shouldn't force an aspect ratio
  // that might crop the image. We just render a standard image.
  if (!width || !height) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-contain transition-opacity duration-400 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: '200px', backgroundColor: isLoaded ? 'transparent' : '#e5e7eb' }}
      />
    );
  }

  // Calculate aspect ratio padding — this is what locks the height BEFORE image loads
  const aspectRatio = (height / width) * 100; 

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: `${aspectRatio}%`, overflow: 'hidden' }}>
      
      {/* Blurhash or skeleton — fills the aspect-ratio box */}
      {!isLoaded && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {blurhash ? (
            <Blurhash
              hash={blurhash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#e5e7eb' }} />
          )}
        </div>
      )}

      {/* Actual image — absolutely positioned inside the ratio box */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />
    </div>
  );
};

export const PublicGallery = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [studioInfo, setStudioInfo] = useState(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [showLikedPhotosModal, setShowLikedPhotosModal] = useState(false);
    const [images, setImages] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [likedImages, setLikedImages] = useState(new Set());
    const [galleryPin, setGalleryPin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinInput, setPinInput] = useState("");
    const [pinError, setPinError] = useState("");
    const [pendingDownloadAction, setPendingDownloadAction] = useState(null);
    const [pendingGeneralAction, setPendingGeneralAction] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showHero, setShowHero] = useState(true);
    const [heroVisible, setHeroVisible] = useState(true);

    // Search state
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // PIN verification state with expiration
    const [pinVerificationTime, setPinVerificationTime] = useState(null);
    const [clientEmail, setClientEmail] = useState(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pendingFavoriteAction, setPendingFavoriteAction] = useState(null);

    // Download Quality Selection State
    const [showDownloadQualityModal, setShowDownloadQualityModal] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState("high"); // 'high' or 'web'
    const [downloadTarget, setDownloadTarget] = useState(null); // stores the image object or 'batch'

    // Google Photos State
    const [googlePhotosSuccessInfo, setGooglePhotosSuccessInfo] = useState(null);
    const [googlePhotosError, setGooglePhotosError] = useState(null);
    const [heroImageUrl, setHeroImageUrl] = useState(null);

    const galleryRef = useRef(null);
    const heroRef = useRef(null);

    // ✅ SINGLE useEffect - Replace lines 58-220 with this
    useEffect(() => {
      const fetchSharedGallery = async () => {
        if (!slug) {
          setError("Invalid gallery link");
          setLoading(false);
          return;
        }

        // Check Google Photos URL params
        const searchParams = new URLSearchParams(window.location.search);
        const gpStatus = searchParams.get('googlePhotos');
        if (gpStatus === 'success') {
          const email = searchParams.get('email') || '';
          const count = searchParams.get('count') || 'some';
          setGooglePhotosSuccessInfo({ email, count });
          searchParams.delete('googlePhotos');
          searchParams.delete('email');
          searchParams.delete('count');
          const newUrl = window.location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
          window.history.replaceState({}, '', newUrl);
        } else if (gpStatus === 'error') {
          const msg = searchParams.get('msg') || '';
          let displayMsg = 'There was an error saving your photos to Google Photos. Please try again.';
          if (msg === 'batch_expired') displayMsg = 'Your session expired. Please try uploading again.';
          if (msg === 'missing_params') displayMsg = 'Missing authorization details from Google. Please try again.';
          setGooglePhotosError(displayMsg);
          searchParams.delete('googlePhotos');
          searchParams.delete('msg');
          const newUrl = window.location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
          window.history.replaceState({}, '', newUrl);
        }

        setLoading(true);
        try {
          const data = await accessSharedGallery(slug);

          if (!data || !data.success) {
            setError("Gallery not found or no longer available");
            setLoading(false);
            return;
          }
          setProject({
            id: data.projectId,
            title: data.projectTitle || "Shared Gallery",
            eventDate: data.eventDate || new Date().toISOString(),
            studioName: data.studioName || "",
            studioLogo: data.studioLogo || null,
            coverImage: data.coverImage || null,
          });

          if (data.studioInfo) {
            setStudioInfo(data.studioInfo);
          }

          const processedFolders = (data.folders || []).map((folder) => ({
            id: folder._id || folder.id,
            name: folder.name,
            description: folder.description || "",
            imageCount: folder.imageCount || 0,
          }));
          setFolders(processedFolders);

          if (processedFolders.length > 0) {
            setSelectedFolder(processedFolders[0]);
          }

          const processedImages = (data.images || []).map((img, idx) => ({
            id: img._id || img.id || idx,
            src: img.image_url || img.url || img.imageUrl || img.thumbnailUrl,
            alt: img.filename || img.title || img.alt || "",
            blurhash: img.blurhash || null,
            folderName: img.folderName || "AllPhotos",
            width: img.width || null,
            height: img.height || null,
            likedByClients: img.likedByClients || [],
          }));
          setImages(processedImages);
          setGalleryPin(data.galleryPin || null);

          // ✅ Load PIN verification from localStorage if it exists and is not expired
          const storedPinTime = localStorage.getItem(`pin_verified_${slug}`);
          if (storedPinTime) {
            try {
              const pinTime = JSON.parse(storedPinTime);
              setPinVerificationTime(pinTime);
            } catch (e) {
              console.warn("Could not parse stored PIN time");
            }
          }

          // ✅ Load client email from localStorage if it exists
          const storedEmail = localStorage.getItem(`client_email_${slug}`);
          if (storedEmail) {
            setClientEmail(storedEmail);

            // Initialize liked images from processed images
            const favoriteIds = new Set();
            processedImages.forEach((img) => {
              if (img.likedByClients && img.likedByClients.includes(storedEmail.toLowerCase())) {
                favoriteIds.add(img.id);
              }
            });
            setLikedImages(favoriteIds);

            // Also fetch from API to ensure we have the latest
            loadClientFavorites(storedEmail);
          }

        } catch (err) {
          console.error("Error fetching shared gallery:", err);
          if (err.message.includes("expired")) {
            setError("This gallery link has expired");
          } else if (err.message.includes("not available")) {
            setError("This gallery is no longer available");
          } else {
            setError("Failed to load gallery");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchSharedGallery();
    }, [slug]);

    // Keep the hero intersection observer
    useEffect(() => {
      if (!heroRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setHeroVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(heroRef.current);
      return () => observer.disconnect();
    }, []);

    const scrollToGallery = () => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const loadClientFavorites = async (email) => {
      try {
        const response = await getClientFavorites(slug, email);
        if (response.success && response.images) {
          const favoriteIds = new Set(response.images.map((img) => img._id || img.id));
          setLikedImages(favoriteIds);
        }
      } catch (error) {
        console.error("Error loading client favorites:", error);
      }
    };

    // Check if PIN verification has expired (15 minutes = 900000 ms)
    const isPinExpired = () => {
      if (!pinVerificationTime) return true;
      const currentTime = Date.now();
      const PIN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
      return currentTime - pinVerificationTime > PIN_EXPIRY_MS;
    };

    // Check if PIN is currently valid
    const isPinVerified = pinVerificationTime && !isPinExpired();

    const handleClientPasswordVerification = async () => {
      if (!pinInput.trim()) {
        setPinError("Please enter PIN");
        return;
      }

      try {
        await verifyClientPassword(slug, pinInput.trim());
        // Store the PIN verification time with timestamp
        setPinVerificationTime(Date.now());
        setShowPinModal(false);
        setPinInput("");
        setPinError("");
        setSuccessMessage("PIN verified! You can now download and favorite images.");
        localStorage.setItem(`pin_verified_${slug}`, JSON.stringify(Date.now()));

        if (pendingDownloadAction) {
          pendingDownloadAction();
          setPendingDownloadAction(null);
        }
        if (pendingFavoriteAction) {
          pendingFavoriteAction();
          setPendingFavoriteAction(null);
        }
        if (pendingGeneralAction) {
          pendingGeneralAction();
          setPendingGeneralAction(null);
        }
      } catch (error) {
        console.error("PIN Verification Error:", error);
        setPinError("Invalid PIN. Please try again.");
        setPinInput("");
      }
    };

const checkEmailAndLike = async (imageId) => {
  const storedEmail = localStorage.getItem(`client_email_${slug}`);
  if (storedEmail) {
    setClientEmail(storedEmail);
    await performLike(imageId, storedEmail);
    return;
  }
  // Pass a fresh localStorage read inside the pending action, not the stale closure
  setPendingFavoriteAction(() => async () => {
    const freshEmail = localStorage.getItem(`client_email_${slug}`);
    if (freshEmail) await performLike(imageId, freshEmail);
  });
  setShowEmailModal(true);
};

    const handleLike = async (imageId, e) => {
      if (e) e.stopPropagation();

      // ✅ Check if PIN is verified first
      if (!isPinVerified && galleryPin) {
        // PIN not verified, ask for PIN first
        setPendingFavoriteAction(() => () => checkEmailAndLike(imageId));
        setShowPinModal(true);
        return;
      }

      checkEmailAndLike(imageId);
    };

    // Update performLike to accept email parameter
    const performLike = async (imageId, email = clientEmail) => {
      try {
        const response = await toggleClientFavorite(slug, imageId, email);

        setLikedImages((prev) => {
          const newSet = new Set(prev);
          if (response.isFavorite) {
            newSet.add(imageId);
          } else {
            newSet.delete(imageId);
          }
          return newSet;
        });



      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

    const handleEmailSubmit = async () => {
      if (!emailInput.trim()) {
        setEmailError("Please enter your email");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.trim())) {
        setEmailError("Please enter a valid email address");
        return;
      }

      const normalizedEmail = emailInput.trim().toLowerCase();
      setClientEmail(normalizedEmail);
      localStorage.setItem(`client_email_${slug}`, normalizedEmail);
      setShowEmailModal(false);
      setEmailError("");
      setEmailInput("");
      setSuccessMessage("Email saved! You can now favorite your images");

      // Load existing favorites for this email
      await loadClientFavorites(normalizedEmail);

      // Execute pending favorite action if any
      if (pendingFavoriteAction) {
        await pendingFavoriteAction();
        setPendingFavoriteAction(null);
      }
    };

    const handleDownload = async (image, e) => {
      if (e) e.stopPropagation();

      // Check if PIN is valid
      if (!isPinVerified && galleryPin) {
        setPendingDownloadAction(() => () => {
          setDownloadTarget(image);
          setShowDownloadQualityModal(true);
        });
        setShowPinModal(true);
        return;
      }

      // Instead of downloading immediately, show quality modal
      setDownloadTarget(image);
      setShowDownloadQualityModal(true);
    };

    const performDownload = async (image, quality = "high") => {
      try {
        await downloadSingleImage(project.id, image.src, image.alt || "image.jpg", quality);
        setSuccessMessage("Download started");
      } catch (error) {
        console.error("Error downloading image:", error);
        setErrorMessage("Failed to download image");
      }
    };

    const handleBatchDownload = async () => {
      if (selectedImages.size === 0) {
        setErrorMessage("Please select images to download");
        return;
      }

      // Check if PIN is valid
      if (!isPinVerified && galleryPin) {
        setPendingDownloadAction(() => () => {
          setDownloadTarget("batch");
          setShowDownloadQualityModal(true);
        });
        setShowPinModal(true);
        return;
      }

      // Instead of downloading immediately, show quality modal
      setDownloadTarget("batch");
      setShowDownloadQualityModal(true);
    };

    const performBatchDownload = async (quality = "high", customIdsSet = null) => {
      try {
        const targetIds = customIdsSet || selectedImages;
        const selectedImageIds = Array.from(targetIds);
        const filteredImages = selectedFolder
          ? images.filter((img) => img.folderName === selectedFolder.name)
          : images;
        // Search through ALL images to resolve IDs properly if we are passing favorites globally
        const searchSource = customIdsSet ? images : filteredImages;
        const photosForDownload = searchSource
          .filter(img => selectedImageIds.includes(img.id))
          .map(img => ({ ...img, _id: img.id }));

        await downloadImagesAsZip(selectedImageIds, photosForDownload, quality);
        setSuccessMessage(`Downloading ${selectedImageIds.length} images...`);
        if (!customIdsSet) {
          setSelectedImages(new Set());
          setIsSelectMode(false);
        }
      } catch (error) {
        console.error("Error downloading images:", error);
        setErrorMessage("Failed to download images");
      }
    };

    const handleQualitySelection = () => {
      setShowDownloadQualityModal(false);
      
      // If PIN is required but not verified, we need to ask for PIN first.
      // But we handled PIN check before opening this modal in `handleDownload` / `handleBatchDownload`.
      // The pendingDownloadAction was set there to either performDownload(img) or performBatchDownload().
      // Wait, let's just execute the actual download here.
      
      if (downloadTarget === "batch") {
         performBatchDownload(selectedQuality);
      } else if (downloadTarget) {
         performDownload(downloadTarget, selectedQuality);
      }
      
      setDownloadTarget(null);
    };

    const handleToggleSelect = (imageId, e) => {
      e.stopPropagation();
      setSelectedImages(prev => {
        const newSet = new Set(prev);
        if (newSet.has(imageId)) {
          newSet.delete(imageId);
        } else {
          newSet.add(imageId);
        }
        return newSet;
      });
    };

    const handleImageClick = (index, e) => {
      if (isSelectMode) {
        const image = filteredImages[index];
        handleToggleSelect(image.id, e);
      } else {
        setLightboxIndex(index);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem(`client_email_${slug}`);
      localStorage.removeItem(`pin_verified_${slug}`);
      setClientEmail(null);
      setPinVerificationTime(null);
      setLikedImages(new Set());
      setSuccessMessage("Logged out successfully");
      setSearchQuery("");
      setSearchResults([]);
    };

    const filteredImages = showFavoritesOnly
      ? images.filter((img) => likedImages.has(img.id))
      : images;



    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Masonry breakpoint columns
    // Masonry breakpoint columns

    // Scroll spy for folders
    useEffect(() => {
      if (showFavoritesOnly || folders.length === 0) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          let visibleFolder = null;
          let maxRatio = 0;
          
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              visibleFolder = entry.target.id.replace('folder-', '');
            }
          });
          
          if (visibleFolder) {
            const folder = folders.find(f => f.id === visibleFolder || f.id === parseInt(visibleFolder));
            // Removed strict dependency check to avoid rapid flipping, simple state update
            if (folder) {
               setSelectedFolder(prev => prev?.id !== folder.id ? folder : prev);
            }
          }
        },
        { rootMargin: "-80px 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] } 
      );
      
      folders.forEach(folder => {
        const el = document.getElementById(`folder-${folder.id}`);
        if (el) observer.observe(el);
      });
      
      return () => observer.disconnect();
    }, [folders, showFavoritesOnly]);

    // Validate hero/cover image URL — if broken, pick a random gallery image
    useEffect(() => {
      const candidateUrl = project?.coverImage || (images.length > 0 ? images[0].src : null);
      if (!candidateUrl) { setHeroImageUrl(null); return; }

      const img = new Image();
      img.onload = () => setHeroImageUrl(candidateUrl);
      img.onerror = () => {
        if (images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          setHeroImageUrl(images[randomIndex].src);
        } else {
          setHeroImageUrl(null);
        }
      };
      img.src = candidateUrl;
    }, [project?.coverImage, images]);

    const breakpointColumns = {
      default: 5,   // Increased from 4 to 5 for large screens
      1536: 4,      // 2XL screens
      1280: 3,      // XL screens
      1024: 3,      // Lg screens
      640: 2        // Mobile
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading your gallery...</p>
          </div>
        </div>
      );
    }

    {/* MODERN USER TYPE SELECTION MODAL - REMOVED */ }
    // No longer show user type modal, directly show photos

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <X className="h-20 w-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Gallery Not Available</h2>
            <p className="text-gray-600 text-lg">{error}</p>
          </div>
        </div>
      );
    }


    return (
      <div className="min-h-screen bg-white">
        {successMessage && (
          <Success onClose={() => setSuccessMessage(null)} autoClose={true}>
            {successMessage}
          </Success>
        )}
        {errorMessage && (
          <Error onClose={() => setErrorMessage(null)} autoClose={true}>
            {errorMessage}
          </Error>
        )}
        {/* Hero Section - Full Screen with Fade */}
        {showHero && heroImageUrl && (
          <div
            ref={heroRef}
            className={`relative h-screen w-full overflow-hidden transition-opacity duration-1000 ${heroVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Background Image with Parallax Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105"
              style={{
                backgroundImage: `url(${heroImageUrl})`,
                filter: "brightness(0.75)",
                transition: "transform 0.3s ease-out",
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

            {/* Animated Content */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between cursor-pointer" onClick={scrollToGallery}>
              
              {/* Top Left: Photos By */}


              {/* Bottom Left: Title & Date */}
              <div className="mt-auto w-full flex items-end justify-between">
                <div className="flex flex-col text-left">
                  <h1
                    className="animate-slideUp drop-shadow-2xl m-0 p-0 text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(24px, 2.67vw, 48px)", // Fallback if vw too small on mobile
                      letterSpacing: "0.17vw",
                      fontWeight: 400,
                      marginBottom: "1.5vh",
                      lineHeight: "normal",
                      textTransform: "none",
                      animationDelay: "0.4s",
                      animationFillMode: "both",
                      textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
                    }}
                  >
                    {project?.title?.toUpperCase()}
                  </h1>
                  
                  <div
                    className="animate-slideUp drop-shadow-lg text-white"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "clamp(12px, 1.07vw, 20px)",
                      letterSpacing: "0.32vw",
                      fontWeight: 400,
                      lineHeight: "18px",
                      textTransform: "uppercase",
                      animationDelay: "0.6s",
                      animationFillMode: "both",
                      textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
                    }}
                  >
                    {formatDate(project?.eventDate)}
                  </div>
                </div>

                {/* Animated Scroll Indicator (Bottom Right/Center) */}
                <div 
                  className="animate-bounce mb-4 ml-4"
                  style={{ animationDelay: "1s" }}
                >
                   <ChevronDown className="text-white drop-shadow-md cursor-pointer" size={36} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <div ref={galleryRef} className="bg-white">
          {/* GalleryToolbar replaces Folder Navigation and Toolbar */}
          <GalleryToolbar
            project={project}
            folders={folders}
            selectedFolder={selectedFolder}
            setSelectedFolder={(folder) => {
              setSelectedFolder(folder);
              const el = document.getElementById(`folder-${folder.id}`);
              if (el) {
                // Offset for sticky toolbar if needed, else smooth scroll
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            onSearchResults={(results, query) => {
              setSearchResults(results);
              setSearchQuery(query);
              if (query) {
                setTimeout(() => {
                  galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }
            }}
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
            setShowLikedPhotosModal={setShowLikedPhotosModal}
            filteredImagesLength={filteredImages.length}
            likedImages={likedImages}
            images={images}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            isSelectMode={isSelectMode}
            setIsSelectMode={setIsSelectMode}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            handleBatchDownload={handleBatchDownload}
            clientEmail={clientEmail}
            setShowEmailModal={setShowEmailModal}
            handleLogout={handleLogout}
            isPinVerified={isPinVerified}
            galleryPin={galleryPin}
            onRequirePin={(action) => {
               setPendingGeneralAction(() => action);
               setShowPinModal(true);
            }}
            onSessionExpired={() => {
              // Clear ALL session data at once
              localStorage.removeItem(`client_email_${slug}`);
              localStorage.removeItem(`pin_verified_${slug}`);
              document.cookie = "guest_search_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              setClientEmail(null);
              setPinVerificationTime(null);
              setLikedImages(new Set());
              setSearchQuery("");
              setSearchResults([]);
              setErrorMessage("Your session has expired. Please re-enter your PIN to continue.");
              setShowPinModal(true);
            }}
          />

          {/* Masonry Gallery Sections */}
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 pt-8">
            {showFavoritesOnly ? (
               filteredImages.length === 0 ? (
                 <div className="masonry-empty">
                   <p>No favorite photos yet</p>
                 </div>
               ) : (
                 <div className="mb-16">
                   <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-gray-900" style={{ fontFamily: "'Jost', sans-serif" }}>Your Favorites</h2>
                   <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-grid-column">
                     {filteredImages.map((image, index) => {
                       const isSelected = selectedImages.has(image.id);
                       const isLiked = likedImages.has(image.id);
                       return (
<div key={image.id} className="masonry-image-container" onClick={(e) => handleImageClick(index, e)}>
  <BlurhashImage src={image.src} alt={image.alt} blurhash={image.blurhash} width={image.width} height={image.height} />
                           {isSelectMode && (
                             <div className="masonry-checkbox-wrapper" onClick={(e) => handleToggleSelect(image.id, e)}>
                               <div className={`masonry-checkbox ${isSelected ? "selected" : "not-selected"}`}>
                                 {isSelected && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                               </div>
                             </div>
                           )}
                           {!isSelectMode && (
                             <div className="masonry-overlay">
                               <div className="masonry-actions">
                                 <button onClick={(e) => handleLike(image.id, e)} className={`masonry-action-btn ${isLiked ? "liked" : "not-liked"}`}>
                                   <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} />
                                 </button>
                                 <button onClick={(e) => handleDownload(image, e)} className="masonry-action-btn download">
                                   <Download size={18} strokeWidth={2} />
                                 </button>
                               </div>
                             </div>
                           )}
                         </div>
                       );
                     })}
                   </Masonry>
                 </div>
               )
            ) : searchQuery ? (
               searchResults.length > 0 ? (
                 <div className="mb-16">
                   <div className="flex items-center justify-between mb-8">
                     <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Jost', sans-serif" }}>Search Results</h2>
                     <button onClick={() => { setSearchResults([]); setSearchQuery(""); }} className="text-sm text-gray-500 hover:text-gray-900 uppercase tracking-widest font-semibold border-b border-gray-400">Clear Search</button>
                   </div>
                   <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-grid-column">
                   {searchResults.map((result, idx) => {
                     // Find the full image object from state to have correct id and properties
                     const fullImage = images.find(img => img.src === result.image_url) || { ...result, id: result.id || Math.random().toString(), src: result.image_url, alt: result.filename };
                     const globalIndex = images.findIndex(img => img.id === fullImage.id) || idx;
                     const isSelected = selectedImages.has(fullImage.id);
                     const isLiked = likedImages.has(fullImage.id);
                     
                     return (
                       <div key={fullImage.id || idx} className="masonry-image-container" onClick={(e) => handleImageClick(globalIndex, e)}>
                         <BlurhashImage src={fullImage.src} alt={fullImage.alt} blurhash={fullImage.blurhash} />
                         {isSelectMode && (
                           <div className="masonry-checkbox-wrapper" onClick={(e) => handleToggleSelect(fullImage.id, e)}>
                             <div className={`masonry-checkbox ${isSelected ? "selected" : "not-selected"}`}>
                               {isSelected && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                             </div>
                           </div>
                         )}
                         {!isSelectMode && (
                           <div className="masonry-overlay">
                             <div className="masonry-actions">
                               <button onClick={(e) => handleLike(fullImage.id, e)} className={`masonry-action-btn ${isLiked ? "liked" : "not-liked"}`}>
                                 <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} />
                               </button>
                               <button onClick={(e) => handleDownload(fullImage, e)} className="masonry-action-btn download">
                                 <Download size={18} strokeWidth={2} />
                               </button>
                             </div>
                           </div>
                         )}
                       </div>
                     );
                   })}
                   </Masonry>
                 </div>
               ) : (
                 <div className="mb-16 min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                   <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>No Photos Found</h2>
                   <p className="text-gray-500 text-xl max-w-2xl leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                     {(() => {
                        const messages = [
                          "Sometimes the best moments are just hiding under a different name.",
                          "We couldn't find any photos matching that description. Try another keyword?",
                          "It seems these memories are playing hide and seek.",
                          "No matches found this time. Let's try searching for something else."
                        ];
                        // Use the query length as a simple seed so it changes per query but stays stable
                        return messages[searchQuery.length % messages.length];
                     })()}
                   </p>
                   <button 
                     onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                     }} 
                     className="mt-8 px-8 py-3 bg-gray-900 text-white hover:bg-black uppercase tracking-widest text-xs font-bold transition-colors"
                     style={{ fontFamily: "'Jost', sans-serif" }}
                   >
                     Clear Search
                   </button>
                 </div>
               )
            ) : (
               folders.map((folder) => {
                 const folderImages = images.filter(img => img.folderName === folder.name);
                 if (folderImages.length === 0) return null;
                 
                 return (
                   <div key={folder.id} id={`folder-${folder.id}`} className="mb-16 scroll-mt-28 min-h-[50vh]">
                     <h2 className="text-xl font-bold uppercase tracking-widest text-center mt-12 mb-8 text-gray-900 pb-2" style={{ fontFamily: "'Jost', sans-serif" }}>{folder.name?.split("/").pop()}</h2>
                     <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-grid-column">
                       {folderImages.map((image, index) => {
                         const globalIndex = images.findIndex(img => img.id === image.id);
                         const isSelected = selectedImages.has(image.id);
                         const isLiked = likedImages.has(image.id);
                         return (
                           <div key={image.id} className="masonry-image-container" onClick={(e) => handleImageClick(showFavoritesOnly ? index : globalIndex, e)}>
  <BlurhashImage src={image.src} alt={image.alt} blurhash={image.blurhash} width={image.width} height={image.height} />                             {isSelectMode && (
                               <div className="masonry-checkbox-wrapper" onClick={(e) => handleToggleSelect(image.id, e)}>
                                 <div className={`masonry-checkbox ${isSelected ? "selected" : "not-selected"}`}>
                                   {isSelected && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                 </div>
                               </div>
                             )}
                             {!isSelectMode && (
                               <div className="masonry-overlay">
                                 <div className="masonry-actions">
                                   <button onClick={(e) => handleLike(image.id, e)} className={`masonry-action-btn ${isLiked ? "liked" : "not-liked"}`}>
                                     <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} />
                                   </button>
                                   <button onClick={(e) => handleDownload(image, e)} className="masonry-action-btn download">
                                     <Download size={18} strokeWidth={2} />
                                   </button>
                                 </div>
                               </div>
                             )}
                           </div>
                         );
                       })}
                     </Masonry>
                   </div>
                 );
               })
            )}
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={filteredImages.map((img) => ({ src: img.src, alt: img.alt }))}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
          controller={{ closeOnBackdropClick: true }}
        />

        {/* Studio Footer */}
        {studioInfo && (
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    {studioInfo.logo && (
                      <img
                        src={studioInfo.logo}
                        alt={studioInfo.name}
                        className="h-16 w-16 object-contain rounded-lg bg-white/5 p-2"
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {studioInfo.name}
                      </h3>
                      {studioInfo.tagline && (
                        <p className="text-gray-400 italic">
                          {studioInfo.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {studioInfo.mainAddress && (
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin size={18} className="mt-1 flex-shrink-0" />
                      <div>
                        <p>{studioInfo.mainAddress.addressLine1}</p>
                        {studioInfo.mainAddress.addressLine2 && (
                          <p>{studioInfo.mainAddress.addressLine2}</p>
                        )}
                        <p>
                          {studioInfo.mainAddress.city},{" "}
                          {studioInfo.mainAddress.state}
                        </p>
                        <p>{studioInfo.mainAddress.country}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-6">Get in Touch</h4>
                  {studioInfo.email && (
                    <a
                      href={`mailto:${studioInfo.email}`}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Mail size={18} />
                      <span>{studioInfo.email}</span>
                    </a>
                  )}
                  {studioInfo.phone && (
                    <a
                      href={`tel:${studioInfo.phone}`}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Phone size={18} />
                      <span>{studioInfo.phone}</span>
                    </a>
                  )}
                  {studioInfo.website && (
                    <a
                      href={studioInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Globe size={18} />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 mt-12 pt-8 text-center">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} {studioInfo.name}. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        )}

        {/* Liked Photos Modal */}
        <LikedPhotosModal
          showLikedPhotosModal={showLikedPhotosModal}
          setShowLikedPhotosModal={setShowLikedPhotosModal}
          likedImageObjects={images.filter((img) => likedImages.has(img.id))}
          clientEmail={clientEmail}
          handleBatchDownload={async (customIdsSet, quality) => {
             if (!isPinVerified && galleryPin) {
                setPendingDownloadAction(() => () => performBatchDownload(quality, customIdsSet));
                setShowPinModal(true);
                return;
             }
             await performBatchDownload(quality, customIdsSet);
          }}
        />

        {/* GalleryModals */}
        <GalleryModals
          showPinModal={showPinModal}
          setShowPinModal={setShowPinModal}
          pinInput={pinInput}
          setPinInput={setPinInput}
          pinError={pinError}
          setPinError={setPinError}
          setPendingDownloadAction={setPendingDownloadAction}
          setPendingFavoriteAction={setPendingFavoriteAction}
          handleClientPasswordVerification={handleClientPasswordVerification}
          showEmailModal={showEmailModal}
          setShowEmailModal={setShowEmailModal}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          emailError={emailError}
          setEmailError={setEmailError}
          handleEmailSubmit={handleEmailSubmit}
          showDownloadQualityModal={showDownloadQualityModal}
          setShowDownloadQualityModal={setShowDownloadQualityModal}
          selectedQuality={selectedQuality}
          setSelectedQuality={setSelectedQuality}
          handleQualitySelection={handleQualitySelection}
          downloadTarget={downloadTarget}
          clientEmail={clientEmail}
        />



        {/* Google Photos Success/Error Modals */}
        <GooglePhotosSuccessModal
          isOpen={!!googlePhotosSuccessInfo}
          onClose={() => setGooglePhotosSuccessInfo(null)}
          email={googlePhotosSuccessInfo?.email}
          count={googlePhotosSuccessInfo?.count}
        />
        <GooglePhotosErrorModal
          isOpen={!!googlePhotosError}
          onClose={() => setGooglePhotosError(null)}
          errorMsg={googlePhotosError}
        />
    </div>
    );
  };
