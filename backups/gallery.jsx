
export const accessSharedGallery = async (
  req: Request<{ slug: string }>,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const project = (await Project.findOne({
      "gallerySettings.shareLink.slug": slug,
    })
      .select("gallerySettings folders projectTitle createdBy startDate createdBy")
      .lean()) as any;

    const studio = await StudioModel.findOne({ createdBy: project.createdBy });

    if (!project) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const shareLink = project.gallerySettings?.shareLink;

    if (!shareLink || !shareLink.isActive) {
      return res.status(403).json({ message: "This gallery is not available" });
    }

    // Check expiry
    if (shareLink.expiresAt && new Date() > new Date(shareLink.expiresAt)) {
      return res.status(410).json({ message: "This gallery link has expired" });
    }

    // accessibleFolders: empty array = all public folders; non-empty = only those specific folders
    // Block only when project has no folders at all
    if (!project.folders || project.folders.length === 0) {
      return res.status(404).json({ message: "This gallery has no folders" });
    }

    // Filter folders based on visibility and accessible folders
    let accessibleFolders = project.folders.filter(
      (f: any) => f.visibility !== "hidden"
    );

    if (shareLink.accessibleFolders && shareLink.accessibleFolders.length > 0) {
      // Only show specific folders
      accessibleFolders = accessibleFolders.filter((f: any) =>
        shareLink.accessibleFolders.some(
          (id: any) => id.toString() === f._id.toString()
        )
      );
    }

    // Get images for accessible folders (may be empty if referenced folders were deleted)
    let images: any[] = [];
    const folderNames = accessibleFolders.map((f: any) => f.name);

    if (folderNames.length > 0) {
      const dbImages = await Images.find({
        event_name: project._id.toString(),
        $or: [
          { folderName: { $in: folderNames } },
          { additionalFolders: { $in: folderNames } },
        ],
      }).select("-embeddings -__v -createdAt -updatedAt -content_type");

      // Generate BlurHashes on the fly for testing
      images = await Promise.all(
        dbImages.map(async (img: any) => {
          if (!img.blurhash && img.image_url) {
            try {
              // 1. Download image
              const response = await axios.get(img.image_url, {
                responseType: "arraybuffer",
                timeout: 10000,
              });

              // 2. Process with Sharp
              const { data: pixels, info } = await sharp(response.data)
                .resize(32, 32, { fit: "inside" })
                .ensureAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

              // 3. Encode with blurhash
              const blurhash = encode(
                new Uint8ClampedArray(pixels),
                info.width,
                info.height,
                4, // componentX
                4  // componentY
              );

              // 4. Update the document to save computation for next time
              img.blurhash = blurhash;
              await Images.findByIdAndUpdate(img._id, { blurhash });
              
              return { ...img.toObject(), blurhash };
            } catch (blurError) {
              console.error(`Failed to generate blurhash for image ${img._id}:`, blurError);
            }
          }
          return img;
        })
      );
    }

    res.json({
      success: true,
      projectId: project._id,
      projectTitle: project.projectTitle,
      studioName: studio?.name || "",
      studioLogo: studio?.logo || null,
      studioAddress: studio?.mainAddress || null,
      folders: accessibleFolders,
      images: images,
      galleryPin: project.gallerySettings?.galleryPin || null,
    });
  } catch (error: any) {
    console.error("Error accessing shared gallery:", error);
    res.status(500).json({ message: "Failed to access gallery" });
  }
};





























/**
 * Access shared gallery via public slug (no auth)
 */
export const accessSharedGallery = async (slug) => {
  try {
    const response = {
    "success": true,
    "projectId": "69a97139893baa3902d20da6",
    "projectTitle": "Sarah Wedding",
    "studioName": "Hari Studios",
    "studioLogo": "https://plexis-images.blr1.digitaloceanspaces.com/1772711922581-hari%40gmail.com1766331289099_sample-photo-55.jpg",
    "studioAddress": {
        "addressLine1": "ABC Street",
        "addressLine2": "CSE block",
        "city": "Bhimavaram",
        "state": "Andhra Pradesh",
        "country": "India"
    },
    "folders": [
        {
            "name": "69a97139893baa3902d20da6/PreWedd",
            "description": "nothin",
            "accessType": "private",
            "settings": {
                "allowDownload": true,
                "allowShare": true,
                "watermarkEnabled": false
            },
            "imageCount": 0,
            "coverImage": null,
            "visibility": "public",
            "likedByOwner": false,
            "_id": "69adab1d49a387b9ab84d635",
            "createdAt": "2026-03-08T17:00:13.241Z",
            "updatedAt": "2026-03-08T17:00:13.241Z"
        }
    ],
    "images": [
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5983a477029d3f39b136",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-34.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-34.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UFPs#C~qay?b~qofRj%MD%t7RjWB?bt7WBof",
            "width": 3600,
            "height": 2403
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5984a477029d3f39b137",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-35.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-35.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UMOW=?x^9o%KNiM}NLkEIdoaxlR.%gxTWARr",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5986a477029d3f39b138",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-37.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-37.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UBN0@:?a^*~X?wt8xsR%E1j]adWB?boLRjaz",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5988a477029d3f39b139",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-38.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-38.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UkMt2FIU%MRi_Nxvofof-;WBRjxuj@jYoLRj",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae598aa477029d3f39b13a",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-39.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-39.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UIM?hwn3og?GrV%Ma|WB?wV@RjkCMcofs;oe",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae598ca477029d3f39b13b",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-41.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-41.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UANAVM?vr;?H+DwGxvV=~qx]Rj.8^+M{ITs-",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae598fa477029d3f39b13c",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-42.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-42.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "U-Ms$P%LX9s:.TbIofj]t8WBadfRn#oIWAjt",
            "width": 3600,
            "height": 2402
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5991a477029d3f39b13d",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-43.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-43.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UJQcr6%Nxu.8~p%Lj[jstSWBM{of?bM{Rjxu",
            "width": 2403,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5993a477029d3f39b13e",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-44.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-44.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "ULPrLF~pRQo}QljbkWRj?vRjM{%2={kqX8xa",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5995a477029d3f39b13f",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-45.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-45.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UPQ].*-px^_3~q%MR%WBx^o#acjExuInoKt7",
            "width": 2403,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5997a477029d3f39b140",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-47.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-47.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UKOpuo_3%O-;~qoJRikCVtWBM_j]%Ms:ofs:",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae5999a477029d3f39b141",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-48.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-48.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UPL4:1-=%MIU_NkCWVog?bRiM_%M-;oft7R*",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae599ba477029d3f39b142",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-49.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-49.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UoPjAL%M%hx]-;t6aeWC_NofMwaeMxWBozWV",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae599da477029d3f39b143",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-50.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-50.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "ULNdt6x]E1x]*0ofoLj]I;aej[ay-;WAWBof",
            "width": 2048,
            "height": 1534
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae599fa477029d3f39b144",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-51.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-51.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "USL4jBt7Rjxu_NM{Rjt7M{WAj[ofxtWBfkj[",
            "width": 2401,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59a2a477029d3f39b145",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-52.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-52.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UaMtN-oy?^wIx[jFWBbbyDjFMwX8%LbHazn$",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59a4a477029d3f39b146",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-53.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-53.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UGO3Xz_3t8~qn~j[kCof-;kCR*Rj?bofM_Rj",
            "width": 2480,
            "height": 3100
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59a5a477029d3f39b147",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-54.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-54.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UgOMsY~pWXtQS5%2ofWBR*t7Rjo0oLxubHWV",
            "width": 2019,
            "height": 2826
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59a7a477029d3f39b148",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-55.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-55.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UPP?:g%M?b_3%Mayoft7_4t8D%M{~qt7M{Rj",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59a9a477029d3f39b149",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-56.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-56.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UgM@it~qt7%Mt7WBxuofRjRjofoft7WBoft7",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59aba477029d3f39b14a",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-57.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-57.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UOLW|sV?%MR*xuoft6og~q%MRPxu?akCR+WB",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59aca477029d3f39b14b",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-58.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-58.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "U6J@RN00E2^*0000%2a|57?a~VWB%0?H?HD*",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59aea477029d3f39b14c",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-59.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-59.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "ULS6JO%KtU.8^*V;WAtTyGoHRMWE?ctTt8Vp",
            "width": 3600,
            "height": 2394
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59b0a477029d3f39b14d",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-60.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-60.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UJN^b*xB%h?v?cogV@t7?waxMxRPxYxvtSRP",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59b2a477029d3f39b14e",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-61.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-61.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UBLE4vn$IT-;~pt7jtWBjZofs:of?af6Rjaz",
            "width": 3000,
            "height": 2000
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59b4a477029d3f39b14f",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-62.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-62.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "U^LO4mt7j[t7~qt6j[ofM{j[WBfPt7WBWBof",
            "width": 2700,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59b6a477029d3f39b150",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-63.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-63.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UHL#2#~qog?b00_3ofWBNG?bM{RP_3%Mxut7",
            "width": 2322,
            "height": 3481
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59b8a477029d3f39b151",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-64.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-64.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UsOgKI-;~qRj?bWBIUofxuayNFof%Mj[ayf6",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59baa477029d3f39b152",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-65.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-65.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "U8K-b7?Ij[_4M+tSbHoI4nIVRiWA?b%LjYbJ",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59bda477029d3f39b153",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-66.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-66.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UQK_2f~q%M?a4._3t7WCxv-;t7IVxtM{ogV@",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59bfa477029d3f39b154",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-67.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-67.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UQI~43?dtS%MoIo#j[t7t9V@obV@xtogogWB",
            "width": 3600,
            "height": 2400
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59c1a477029d3f39b155",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-68.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-68.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UEAwF=~qIUIU009Fxuxu?b%MM{WBD%Rj%M%M",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59c3a477029d3f39b156",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-69.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-69.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UHIWo=EN~V?GT0wIxuI:XSWBs-s:t7W;-oxt",
            "width": 2730,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59c5a477029d3f39b157",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-70.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-70.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UTNAuAxuxu-:~qt7Rjj]%3a{fRWVIUWBt7oe",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59c7a477029d3f39b158",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-71.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-71.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UcNJarM|%#-o?vt7RPW=?^xuMySOMxNHsljE",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59caa477029d3f39b159",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-72.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-72.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UAOpPp~W?b~p_3fkWBj[?bog00M{?GoJt7of",
            "width": 2589,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59cba477029d3f39b15a",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-73.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-73.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UDP?,W?ZWt~q-:t7t6t8tTtTM_M^-;xut7WB",
            "width": 2400,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59cea477029d3f39b15b",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-74.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-74.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UNNT,l~qtR-;~qofj[t7IURkWBWC%Lt7j[jY",
            "width": 2794,
            "height": 3600
        },
        {
            "fileSize": 0,
            "additionalFolders": [],
            "likedByClients": [],
            "likedByOwner": false,
            "_id": "69ae59d0a477029d3f39b15c",
            "refNo": "haricharanbonam@gmail.com1772711753594",
            "filename": "haricharanbonam@gmail.com1772711753594/sample-photo-75.jpg",
            "folderName": "69a97139893baa3902d20da6/PreWedd",
            "image_url": "https://blr1.digitaloceanspaces.com/plexis-images/haricharanbonam@gmail.com1772711753594/sample-photo-75.jpg",
            "event_name": "69a97139893baa3902d20da6",
            "blurhash": "UCE3F+_NWX%M?akCWBj[D*Rjj@j[t7ofa{j[",
            "width": 2400,
            "height": 3600
        }
    ],
    "galleryPin": "3790"
}
    return response;
  } catch (error) {
    console.error("Error accessing shared gallery:", error);
    throw new Error(error.message || "Failed to access gallery");
  }
};



