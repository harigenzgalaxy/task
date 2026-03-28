import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'
import { useQuotationSave } from '../../../contexts/QuotationSaveContext'
import { getLeadById } from '../../../services/leadService'
import { saveQuotationDraft, getQuotationById, getQuotationByIdForEdit, updateQuotation, sendQuotation } from '../../../services/quotationService'
import { generateAndDownloadQuotationPdf, openPdfInNewTab } from '../../../services/pdfService'
import { SendQuotationModal } from './components/SendQuotationModal'
import { QuotationPreview } from './components/QuotationPreview'
import { QuotationEditor } from './components/QuotationEditor'
import { LeadBreadcrumb } from './components/LeadBreadcrumb'
import { Save, Send, Download, LayoutTemplate, ChevronDown } from 'lucide-react'
import { Success } from '../../../Components/Success'
import { Error } from '../../../Components/Error'
import { Skeleton } from '../../../Components/Skeleton'
import { getTemplates } from '../../../services/templateService'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const CreateQuotation = () => {
    const { leadId, quotationId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, studio } = useUser()
    const { startSave, completeSave, failSave } = useQuotationSave()

    // Get lead name from navigation state first, avoid unnecessary API call
    const [lead, setLead] = useState(null)
    const [leadName, setLeadName] = useState(location.state?.leadName || null)
    const [loading, setLoading] = useState(true)
    const [savingDraft, setSavingDraft] = useState(false)
    const [exportingPdf, setExportingPdf] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [showSendModal, setShowSendModal] = useState(false)
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
    const [activeQuotationId, setActiveQuotationId] = useState(quotationId || null)
    const [pendingDraft, setPendingDraft] = useState(null) // local draft awaiting user confirmation
    const hasUnsavedChangesRef = useRef(false)
    const saveDraftRef = useRef(null) // always points to latest handleSaveDraft, avoids stale closures

    // Draft key based on leadId or activeQuotationId
    const draftKey = activeQuotationId ? `quotation_draft_q_${activeQuotationId}` : (leadId ? `quotation_draft_l_${leadId}` : null)

    // Template selector
    const [availableTemplates, setAvailableTemplates] = useState([])
    const [selectedTemplateId, setSelectedTemplateId] = useState('')
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    // Quotation data
    const [quotationData, setQuotationData] = useState({
        quotationNumber: '',
        quotationDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        studio: {
            name: '',
            address: '',
            gstNumber: '',
            phone: '',
            logo: '',
            banner: ''
        },
        clientId: null, // ObjectId of the Client document
        client: { // Display data for the client
            name: '',
            email: '',
            phone: '',
            address: ''
        },
        event: {
            type: '',
            date: '',
            time: '',
            location: '',
        },
        taxRate: '',
        discount: {
            enabled: false,
            type: 'percentage',
            value: ''
        },
        items: [],
        deliverables: [],
        complimentary: [],
        paymentMilestones: [],
        paymentMethods: {
            creditCards: false,
            stripe: false,
            wiseStripe: false,
            paypal: false,
            venmo: false,
            bankTransfer: false,
            cashOrCheck: false
        },
        notes: '',
        termsAndConditions: '',
        customization: {
            primaryColor: '#D4AF37',
            headerColor: '#1F2937',
            sectionColor: '#F9FAFB',
            fontFamily: 'Inter'
        },
        background: {
            type: 'solid',
            color: '#ffffff',
            imageUrl: '',
            imageOpacity: 0.15,
            imageSize: 'cover'
        },
        quotationBackground: {
            type: 'solid',
            color: '#ffffff',
            imageUrl: '',
            imageOpacity: 0.15,
            imageSize: 'cover'
        },
        serviceColumns: {
            date: true,
            location: true,
            crew: true,
            equipment: true,
            individualAmounts: true,
            subTotal: true,
            gst: true,
            discount: false,
            grandTotal: true
        }
    })

    useEffect(() => {
        getTemplates().then(data => setAvailableTemplates(data || []))
    }, [])

    const applyTemplate = (templateId) => {
        setSelectedTemplateId(templateId);
        if (!templateId) {
            setSelectedTemplate(null)
            setQuotationData(prev => ({
                ...prev,
                templateId: null,
                background: {
                    type: 'solid',
                    color: '#ffffff',
                    imageUrl: '',
                    imageOpacity: 0.15,
                    imageSize: 'cover'
                },
                quotationBackground: {
                    type: 'solid',
                    color: '#ffffff',
                    imageUrl: '',
                    imageOpacity: 0.15,
                    imageSize: 'cover'
                }
            }))
            return
        }

        const tpl = availableTemplates.find(t => t._id === templateId || t.id === templateId)
        if (tpl) {
            setSelectedTemplate(tpl)
            setQuotationData(prev => {
                // Merge deliverables: append template ones if they don't already exist by description
                const existingDeliverables = prev.deliverables || []
                const templateDeliverables = tpl.deliverables || []
                const mergedDeliverables = [...existingDeliverables]

                templateDeliverables.forEach(td => {
                    const desc = typeof td === 'string' ? td : (td.description || td.name)
                    const exists = mergedDeliverables.some(ed => (typeof ed === 'string' ? ed : (ed.description || ed.name)) === desc)
                    if (!exists && desc) {
                        mergedDeliverables.push(typeof td === 'string' ? { description: td, quantity: 1 } : td)
                    }
                })

                // Merge complimentary
                const existingComplimentary = prev.complimentary || []
                const templateComplimentary = tpl.complimentary || []
                const mergedComplimentary = [...existingComplimentary]

                templateComplimentary.forEach(tc => {
                    const desc = typeof tc === 'string' ? tc : (tc.description || tc.name)
                    const exists = mergedComplimentary.some(ec => (typeof ec === 'string' ? ec : (ec.description || ec.name)) === desc)
                    if (!exists && desc) {
                        mergedComplimentary.push(typeof tc === 'string' ? { description: tc, quantity: 1 } : tc)
                    }
                })

                return {
                    ...prev,
                    templateId: tpl._id || tpl.id,
                    notes: tpl.notes || prev.notes,
                    termsAndConditions: tpl.termsAndConditions || prev.termsAndConditions,
                    deliverables: mergedDeliverables,
                    complimentary: mergedComplimentary,
                    paymentMilestones: tpl.paymentTerms ? tpl.paymentTerms.map(pt => ({
                        description: pt.description || '',
                        amount: pt.amount || 0,
                        dueDate: pt.dueDate || null
                    })) : prev.paymentMilestones,
                    customization: {
                        ...prev.customization,
                        ...(tpl.customization || {}),
                        primaryColor: tpl.customization?.primaryColor || prev.customization.primaryColor,
                        headerColor: tpl.background?.headerColor || tpl.customization?.headerColor || prev.customization.headerColor,
                        fontFamily: tpl.customization?.fontFamily || prev.customization.fontFamily,
                    },
                    background: tpl.background || prev.background,
                    quotationBackground: tpl.quotationBackground || tpl.background || prev.quotationBackground || prev.background,
                    serviceColumns: {
                        ...(prev.serviceColumns),
                        ...(tpl.serviceColumns || {}),
                        equipment: true // Force equipment visible since there is no UI to toggle it yet
                    }
                }
            })
        }
    }

    // Sync selectedTemplate when selectedTemplateId or availableTemplates changes
    useEffect(() => {
        if (selectedTemplateId && availableTemplates.length > 0 && !selectedTemplate) {
            const tpl = availableTemplates.find(t => t.id === selectedTemplateId)
            if (tpl) {
                // Instead of just setting the template metadata, apply its background/customizations
                applyTemplate(tpl.id)
            }
        }
    }, [selectedTemplateId, availableTemplates, selectedTemplate, applyTemplate])

    useEffect(() => {
        if (studio || user) {
            // Construct address from studio mainAddress if available
            let studioAddress = '';
            if (studio?.mainAddress) {
                const addr = studio.mainAddress;
                studioAddress = [
                    addr.addressLine1,
                    addr.addressLine2,
                    addr.city,
                    addr.state,
                    addr.country
                ].filter(Boolean).join(', ');
            } else if (user?.address) {
                studioAddress = user.address;
            }

            setQuotationData(prev => ({
                ...prev,
                studio: {
                    name: studio?.name || user?.firstName + ' ' + (user?.lastName || '') || prev.studio.name || '',
                    address: studioAddress || prev.studio.address || '',
                    gstNumber: studio?.gstNumber || prev.studio.gstNumber || '',
                    phone: formatPhoneNumber(studio?.phone || user?.phone || prev.studio.phone || ''),
                    logo: studio?.logo || prev.studio.logo || '',
                    banner: studio?.bannerImage || prev.studio.banner || ''
                }
            }))
        }
    }, [studio, user])

    // Combined data loader (Quotation or Lead)
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)

                if (quotationId) {
                    try {
                        const quotationResponse = await getQuotationByIdForEdit(quotationId)
                        const quotation = quotationResponse.data || quotationResponse

                        if (quotation) {
                            // Handle studio - now it's an embedded object in the quotation
                            let studioData = {
                                name: '',
                                address: '',
                                gstNumber: '',
                                phone: '',
                                logo: '',
                                banner: ''
                            }

                            // First try to get current studio data
                            if (studio?.mainAddress) {
                                const addr = studio.mainAddress;
                                studioData = {
                                    name: studio.name || '',
                                    address: [
                                        addr.addressLine1,
                                        addr.addressLine2,
                                        addr.city,
                                        addr.state,
                                        addr.country
                                    ].filter(Boolean).join(', '),
                                    gstNumber: studio.gstNumber || '',
                                    phone: formatPhoneNumber(studio.phone || ''),
                                    logo: studio.logo || '',
                                    banner: studio.bannerImage || ''
                                }
                            } else if (user) {
                                studioData = {
                                    name: user.firstName + ' ' + (user.lastName || ''),
                                    address: user.address || '',
                                    gstNumber: '',
                                    phone: formatPhoneNumber(user.phone || ''),
                                    logo: '',
                                    banner: ''
                                }
                            }

                            if (quotation.studio && typeof quotation.studio === 'object') {
                                // Use the embedded studio data from the quotation
                                studioData = {
                                    name: quotation.studio.name || studioData.name,
                                    address: quotation.studio.address || studioData.address,
                                    gstNumber: quotation.studio.gstNumber || studioData.gstNumber,
                                    phone: formatPhoneNumber(quotation.studio.phone || studioData.phone),
                                    logo: quotation.studio.logo || studioData.logo,
                                    banner: quotation.studio.banner || studioData.banner
                                }
                            }

                            // Handle client - check if it's a populated object (Lead) or just ObjectId
                            let clientData = {
                                name: '',
                                email: '',
                                phone: '',
                                address: ''
                            }

                            if (quotation.client) {
                                if (typeof quotation.client === 'object' && (quotation.client.name || quotation.client.phone || quotation.client.address)) {
                                    // Saved client (phone/address) or populated lead (contactNumber/Location)
                                    clientData = {
                                        name: quotation.client.name || '',
                                        email: quotation.client.email || '',
                                        phone: formatPhoneNumber(quotation.client.phone || quotation.client.contactNumber || quotation.client.whatsappNumber || ''),
                                        address: quotation.client.address || quotation.client.Location || ''
                                    }
                                } else {
                                    // Just ObjectId, fetch lead data
                                    if (quotation.leadId) {
                                        const leadData = await getLeadById(quotation.leadId)
                                        const leadResponseData = leadData.data || leadData
                                        const leadDataObj = leadResponseData.lead || leadResponseData
                                        clientData = {
                                            name: leadDataObj.name || '',
                                            email: leadDataObj.email || '',
                                            phone: formatPhoneNumber(leadDataObj.contactNumber || leadDataObj.whatsappNumber || ''),
                                            address: leadDataObj.Location || ''
                                        }
                                    }
                                }
                            }

                            // Ensure items have id fields and packages have normalized packageItems (name, quantity) for preview
                            const itemsWithIds = (quotation.items || []).map((item, index) => {
                                const packages = (item.packages || []).map(pkg => ({
                                    ...pkg,
                                    packageItems: (pkg.packageItems || []).map(pi => ({
                                        name: pi.name ?? pi.itemName ?? '',
                                        quantity: pi.quantity ?? pi.qty ?? 1,
                                        type: pi.type,
                                        pricingId: pi.pricingId ?? pi._id ?? pi.id
                                    }))
                                }))
                                return {
                                    ...item,
                                    packages,
                                    id: item.id || item._id || `item-${index}-${Date.now()}`,
                                    dueDate: item.dueDate
                                        ? new Date(item.dueDate).toISOString().split('T')[0]
                                        : ''
                                }
                            })

                            const milestonesWithIds = (quotation.paymentMilestones || []).map((milestone, index) => ({
                                ...milestone,
                                id: milestone.id || milestone._id || `milestone-${index}-${Date.now()}`,
                                dueDate: milestone.dueDate
                                    ? new Date(milestone.dueDate).toISOString().split('T')[0]
                                    : ''
                            }))

                            // Ensure deliverables and complimentary have id fields
                            const deliverablesWithIds = (quotation.deliverables || []).map((d, i) => ({
                                ...d,
                                id: d.id || d._id || `del-${i}-${Date.now()}`
                            }))
                            const complimentaryWithIds = (quotation.complimentary || []).map((c, i) => ({
                                ...c,
                                id: c.id || c._id || `comp-${i}-${Date.now()}`
                            }))

                            setQuotationData(prev => ({
                                ...prev,
                                quotationNumber: quotation.quotationNumber || '',
                                quotationDate: quotation.quotationDate
                                    ? new Date(quotation.quotationDate).toISOString().split('T')[0]
                                    : new Date().toISOString().split('T')[0],
                                dueDate: quotation.dueDate
                                    ? new Date(quotation.dueDate).toISOString().split('T')[0]
                                    : new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
                                studio: studioData,
                                clientId: quotation.client,
                                client: clientData,
                                event: quotation.event || prev.event,
                                welcomeMessage: quotation.welcomeMessage || '',
                                taxRate: quotation.taxRate || 0,
                                discount: quotation.discount ? {
                                    enabled: quotation.discount.enabled || false,
                                    type: quotation.discount.type || 'percentage',
                                    value: quotation.discount.value || ''
                                } : prev.discount,
                                items: itemsWithIds,
                                deliverables: deliverablesWithIds,
                                complimentary: complimentaryWithIds,
                                paymentMilestones: milestonesWithIds,
                                paymentMethods: quotation.paymentMethods || prev.paymentMethods,
                                notes: quotation.notes || '',
                                termsAndConditions: quotation.termsAndConditions || '',
                                customization: quotation.customization || prev.customization,
                                background: quotation.background || prev.background,
                                quotationBackground: quotation.quotationBackground || quotation.background || prev.quotationBackground || prev.background,
                                serviceColumns: {
                                    ...(prev.serviceColumns),
                                    ...(quotation.serviceColumns || {}),
                                    equipment: true // Force equipment visible since there is no UI to toggle it yet
                                }
                            }))

                            // Restore selected template if present
                            if (quotation.templateId) {
                                setSelectedTemplateId(quotation.templateId)
                                // We'll let the useEffect below sync the actual template object from availableTemplates
                            }

                            // Set lead name from quotation if available
                            if (quotation.leadId && !leadName) {
                                const leadData = await getLeadById(quotation.leadId)
                                const leadResponseData = leadData.data || leadData
                                const leadDataObj = leadResponseData.lead || leadResponseData
                                if (leadDataObj?.name) {
                                    setLeadName(leadDataObj.name)
                                }
                            }

                            setLoading(false)
                            return
                        }
                    } catch (err) {
                        console.error('Error loading quotation:', err)
                        setErrorMessage('Failed to load quotation data')
                    }
                }

                // Load lead data (for new quotations or if quotation load failed)
                const leadData = await getLeadById(leadId)
                const responseData = leadData.data || leadData
                const leadDataObj = responseData.lead || responseData

                setLead(leadDataObj)
                // Only set leadName if we don't already have it from navigation state
                if (!leadName && leadDataObj?.name) {
                    setLeadName(leadDataObj.name)
                }

                setQuotationData(prev => ({
                    ...prev,
                    dueDate: prev.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
                    studio: {
                        name: studio?.name || user?.name || prev.studio.name || 'Your Studio',
                        address: studio?.address || user?.address || prev.studio.address || '',
                        gstNumber: studio?.gstNumber || prev.studio.gstNumber || '',
                        phone: formatPhoneNumber(studio?.phone || user?.phone || prev.studio.phone || ''),
                        logo: studio?.logo || prev.studio.logo || '',
                        banner: studio?.bannerImage || prev.studio.banner || ''
                    },
                    client: {
                        name: leadDataObj.name || '',
                        email: leadDataObj.email || '',
                        phone: formatPhoneNumber(leadDataObj.contactNumber || leadDataObj.whatsappNumber || ''),
                        address: leadDataObj.Location || ''
                    },
                    event: {
                        ...prev.event,
                        type: leadDataObj.EventType || leadDataObj.customEventType || '',
                        location: leadDataObj.Location || leadDataObj.venue || '',
                        date: leadDataObj.EventDate ?
                            (dayjs(leadDataObj.EventDate).format('MMM D, YYYY h:mm A') +
                                (leadDataObj.EventEndDate ? ' - ' + dayjs(leadDataObj.EventEndDate).format('MMM D, YYYY h:mm A') : ' - ' + dayjs(leadDataObj.EventDate).add(4, 'hour').format('MMM D, YYYY h:mm A')))
                            : ''
                    },
                    items: [],
                    paymentMilestones: []
                }))
            } catch (err) {
                setErrorMessage('Failed to load information')
            } finally {
                setLoading(false)
            }
        }

        if (leadId && user) {
            loadData().then(() => {
                // After server load, check localStorage for an unsaved local draft.
                // Show a banner to let the user decide — don't silently overwrite server data.
                if (draftKey) {
                    const savedDraftStr = localStorage.getItem(draftKey);
                    if (savedDraftStr) {
                        try {
                            const parsedDraft = JSON.parse(savedDraftStr);
                            if (parsedDraft && parsedDraft.items) {
                                setPendingDraft(parsedDraft); // offer restore, don't auto-apply
                            }
                        } catch (e) {
                            console.error("Failed to parse draft from localstorage", e);
                        }
                    }
                }
            });
        }
    }, [leadId, activeQuotationId, user, draftKey])

    // Auto save logic directly via useEffect
    useEffect(() => {
        if (loading || !autoSaveEnabled || !draftKey) return;

        // Mark that there are unsaved changes any time quotationData mutates after load
        hasUnsavedChangesRef.current = true;

        // Save to localStorage immediately on change (debounced 1000ms)
        const localTimer = setTimeout(() => {
            localStorage.setItem(draftKey, JSON.stringify(quotationData));
        }, 1000);

        // Silent API save debounced (15s) — only when there's enough data
        const apiTimer = setTimeout(() => {
            if (quotationData.quotationDate && quotationData.dueDate && quotationData.items && quotationData.items.length > 0 && quotationData.studio?.name) {
                handleSaveDraft(true);
            }
        }, 15000);

        return () => {
            clearTimeout(localTimer);
            clearTimeout(apiTimer);
        };
    }, [quotationData, autoSaveEnabled, loading, draftKey]);

    // Save + warn when the user tries to leave with unsaved changes
    useEffect(() => {
        const attemptSilentSave = () => {
            if (hasUnsavedChangesRef.current) {
                saveDraftRef.current?.(true) // silent API save — fire and forget
            }
        }

        const onBeforeUnload = () => {
            // Fire-and-forget silent save (may not complete on hard close, that's ok)
            if (hasUnsavedChangesRef.current) {
                attemptSilentSave()
            }
        }

        // visibilitychange is reliable for tab switches and in-browser navigation
        const onVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                attemptSilentSave()
            }
        }

        window.addEventListener('beforeunload', onBeforeUnload)
        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])

    // ── Monitor React Router location changes (user clicks to another page) ──
    useEffect(() => {
        const currentPath = location.pathname
        console.log('CreateQuotation: Monitoring route', currentPath)

        // If user navigates away from this quotation page, trigger silent save
        return () => {
            // This cleanup will fire when location changes AND before component unmounts
            if (hasUnsavedChangesRef.current) {
                console.log('CreateQuotation: User navigating away, triggering silent save')
                saveDraftRef.current?.(true) // silent API save — fire and forget
            }
        }
    }, [location.pathname])

    const [showTemplateMenu, setShowTemplateMenu] = useState(false)

    // Calculate totals
    const calculateTotals = (data) => {
        const subtotal = data.items.reduce((sum, item) => {
            // Priority: item.amount (used in services) > item.total (used in older/generic items)
            const amt = item.amount === undefined || item.amount === null
                ? (item.total === '' || item.total === null ? 0 : Number(item.total))
                : Number(item.amount)
            return sum + (amt || 0)
        }, 0)

        const taxRate = data.taxRate === '' || data.taxRate === null ? 0 : Number(data.taxRate) || 0
        const taxAmount = (subtotal * taxRate) / 100

        const discountValue = data.discount.value === '' || data.discount.value === null ? 0 : Number(data.discount.value) || 0
        const discountAmount = data.discount.enabled
            ? data.discount.type === 'percentage'
                ? (subtotal * discountValue) / 100
                : discountValue
            : 0
        const grandTotal = subtotal + taxAmount - discountAmount

        return {
            subtotal,
            discountAmount,
            taxAmount,
            grandTotal
        }
    }

    const handleSaveDraft = async (silent = false, createNewDraft = false) => {
        try {
            // ── Silent auto-save: minimal gate — skip if no items, fill date fallbacks ──
            if (silent) {
                if (!quotationData.items || quotationData.items.length === 0) return; // nothing to save yet

                // Use fallback dates so missing fields never block the auto-save
                if (!quotationData.quotationDate) {
                    quotationData = { ...quotationData, quotationDate: new Date().toISOString().split('T')[0] }
                }
                if (!quotationData.dueDate) {
                    quotationData = { ...quotationData, dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] }
                }
            } else {
                // ── Manual save: strict validation with user-facing errors ──
                if (!quotationData.quotationDate || !quotationData.dueDate) {
                    setErrorMessage('Please fill in quotation date and due date')
                    return
                }

                if (new Date(quotationData.dueDate) < new Date(quotationData.quotationDate)) {
                    setErrorMessage('Due date cannot be before quotation date')
                    return
                }

                if (!quotationData.items || quotationData.items.length === 0) {
                    setErrorMessage('Please add at least one item to the quotation')
                    return
                }

                if (!quotationData.studio.name || !quotationData.studio.name.trim()) {
                    setErrorMessage('Studio name is required')
                    return
                }

                if (!quotationData.studio.address || !quotationData.studio.address.trim()) {
                    setErrorMessage('Studio address is required')
                    return
                }

                if (!quotationData.studio.phone || !quotationData.studio.phone.trim()) {
                    setErrorMessage('Studio phone number is required')
                    return
                }
            }

            // Calculate totals
            const totals = calculateTotals(quotationData)

            // Prepare data for API (remove id fields and sync total/amount)
            const itemsToSave = quotationData.items.map(item => {
                const amount = item.amount === undefined || item.amount === null
                    ? (item.total === '' || item.total === null ? 0 : Number(item.total))
                    : Number(item.amount)

                return {
                    event: item.event || item.description || '',
                    description: item.description || item.event || '',
                    date: item.date || undefined,
                    location: item.location || '',
                    crew: (item.crew || []).map(c => ({ name: c.name, cost: c.cost, pricingId: c.pricingId })),
                    equipment: (item.equipment || []).map(e => ({ name: e.name, cost: e.cost, pricingId: e.pricingId })),
                    packages: (item.packages || []).map(p => ({
                        name: p.name,
                        amount: p.amount,
                        pricingId: p.pricingId,
                        packageItems: p.packageItems || []
                    })),
                    amount: amount,
                    total: amount, // Keep total for backward compatibility
                    quantity: item.quantity || 1
                }
            })

            const paymentMilestonesToSave = quotationData.paymentMilestones.map(milestone => ({
                description: milestone.description,
                dueDate: milestone.dueDate,
                amount: milestone.amount === '' || milestone.amount === null ? 0 : Number(milestone.amount) || 0
            }))

            if (!leadId) {
                setErrorMessage('Lead not found. Please go back to the lead and try again.')
                setSavingDraft(false)
                return
            }

            const quotationToSave = {
                templateId: selectedTemplateId || (selectedTemplate?._id) || undefined,
                leadId: leadId,
                quotationDate: quotationData.quotationDate,
                dueDate: quotationData.dueDate,
                studio: {
                    name: quotationData.studio.name,
                    address: quotationData.studio.address,
                    gstNumber: quotationData.studio.gstNumber,
                    phone: quotationData.studio.phone,
                    logo: quotationData.studio.logo,
                    banner: quotationData.studio.banner
                }, // Send full studio object
                client: quotationData.client, // Send full client object for snapshot
                clientId: quotationData.clientId || leadId, // Keep for backward compatibility
                event: (quotationData.event.type || quotationData.event.date || quotationData.event.time || quotationData.event.location) ? {
                    type: quotationData.event.type || '',
                    date: quotationData.event.date || '',
                    time: quotationData.event.time || '',
                    location: quotationData.event.location || '',
                } : undefined,
                taxRate: quotationData.taxRate === '' || quotationData.taxRate === null ? 0 : Number(quotationData.taxRate) || 0,
                discount: {
                    enabled: quotationData.discount.enabled,
                    type: quotationData.discount.type,
                    value: quotationData.discount.value === '' || quotationData.discount.value === null ? 0 : Number(quotationData.discount.value) || 0
                },
                items: itemsToSave,
                paymentMilestones: paymentMilestonesToSave,
                paymentMethods: quotationData.paymentMethods,
                deliverables: quotationData.deliverables.map(d => ({ description: d.description, quantity: d.quantity })),
                complimentary: quotationData.complimentary.map(c => ({ description: c.description, quantity: c.quantity || 1 })),
                notes: quotationData.notes || '',
                termsAndConditions: quotationData.termsAndConditions || '',
                customization: quotationData.customization,
                background: quotationData.background,
                quotationBackground: quotationData.quotationBackground || quotationData.background,
                serviceColumns: quotationData.serviceColumns,
                ...totals
            }

            if (!silent) setSavingDraft(true)
            else startSave() // show the floating toast

            let response;
            if (activeQuotationId && !createNewDraft) {
                response = await updateQuotation(activeQuotationId, quotationToSave)
            } else {
                response = await saveQuotationDraft(quotationToSave)
                const newId = response?.quotationId || response?.data?.quotationId || response?._id;
                if (newId) {
                    setActiveQuotationId(newId);
                    // Also update the URL silently so page reload keeps the context
                    window.history.replaceState({}, '', `/leads/${leadId}/quotation/${newId}`);
                }
            }

            // Auto-fill quotation number from backend response
            const responseData = response?.data || response;
            if (responseData?.quotationNumber && responseData.quotationNumber !== quotationData.quotationNumber) {
                setQuotationData(prev => ({
                    ...prev,
                    quotationNumber: responseData.quotationNumber
                }))
            }

            if (!silent) {
                hasUnsavedChangesRef.current = false;
                if (draftKey) {
                    localStorage.removeItem(draftKey);
                }
                setSuccessMessage('Draft saved successfully!')
                setTimeout(() => {
                    setSuccessMessage(null)
                    navigate(`/leads/${leadId}`, { state: { fromQuotation: true } })
                }, 700)
            } else {
                completeSave() // switch toast to "Draft saved ✓"
            }
        } catch (error) {
            console.error('Error saving quotation:', error)
            if (!silent) {
                setErrorMessage(error.message || 'Failed to save quotation draft')
            } else {
                failSave() // dismiss toast silently
            }
        } finally {
            setSavingDraft(false) // always reset — was only resetting for non-silent before
        }
    }

    // Keep saveDraftRef fresh on every render so event handlers never read stale state
    useEffect(() => { saveDraftRef.current = handleSaveDraft })

    const handleExportPDF = async () => {
        try {
            setExportingPdf(true)
            setErrorMessage(null)

            let currentQuotationId = activeQuotationId || quotationId

            // Calculate totals first
            const totals = calculateTotals(quotationData)

            // Prepare quotation data with totals
            const quotationToSave = {
                templateId: selectedTemplateId || (selectedTemplate?._id) || undefined,
                leadId: leadId,
                quotationDate: quotationData.quotationDate,
                dueDate: quotationData.dueDate,
                studio: {
                    name: quotationData.studio.name,
                    address: quotationData.studio.address,
                    gstNumber: quotationData.studio.gstNumber,
                    phone: quotationData.studio.phone,
                    logo: quotationData.studio.logo,
                    banner: quotationData.studio.banner
                },
                client: quotationData.client,
                clientId: quotationData.clientId || leadId,
                event: (quotationData.event.type || quotationData.event.date) ? {
                    type: quotationData.event.type || '',
                    date: quotationData.event.date || '',
                    time: quotationData.event.time || '',
                    location: quotationData.event.location || '',
                } : undefined,
                taxRate: quotationData.taxRate === '' || quotationData.taxRate === null ? 0 : Number(quotationData.taxRate) || 0,
                discount: {
                    enabled: quotationData.discount.enabled,
                    type: quotationData.discount.type,
                    value: quotationData.discount.value === '' || quotationData.discount.value === null ? 0 : Number(quotationData.discount.value) || 0
                },
                items: quotationData.items.map(item => {
                    const amount = item.amount === undefined || item.amount === null
                        ? (item.total === '' || item.total === null ? 0 : Number(item.total))
                        : Number(item.amount)
                    return {
                        event: item.event || item.description || '',
                        description: item.description || item.event || '',
                        date: item.date || undefined,
                        location: item.location || '',
                        crew: (item.crew || []).map(c => ({ name: c.name, cost: c.cost, pricingId: c.pricingId })),
                        equipment: (item.equipment || []).map(e => ({ name: e.name, cost: e.cost, pricingId: e.pricingId })),
                        packages: (item.packages || []).map(p => ({
                            name: p.name,
                            amount: p.amount,
                            pricingId: p.pricingId,
                            packageItems: p.packageItems || []
                        })),
                        amount: amount,
                        total: amount,
                        quantity: item.quantity || 1
                    }
                }),
                paymentMilestones: quotationData.paymentMilestones.map(milestone => ({
                    description: milestone.description,
                    dueDate: milestone.dueDate,
                    amount: milestone.amount === '' || milestone.amount === null ? 0 : Number(milestone.amount) || 0
                })),
                paymentMethods: quotationData.paymentMethods,
                deliverables: quotationData.deliverables.map(d => ({ description: d.description, quantity: d.quantity })),
                complimentary: quotationData.complimentary.map(c => ({ description: c.description, quantity: c.quantity || 1 })),
                notes: quotationData.notes || '',
                termsAndConditions: quotationData.termsAndConditions || '',
                customization: quotationData.customization,
                background: quotationData.background,
                quotationBackground: quotationData.quotationBackground || quotationData.background,
                serviceColumns: quotationData.serviceColumns,
                ...totals // Include calculated totals
            }

            // Save or update the quotation
            if (currentQuotationId) {
                await updateQuotation(currentQuotationId, quotationToSave)
            } else {
                const saved = await saveQuotationDraft(quotationToSave)
                currentQuotationId = saved.quotationId || saved._id
            }

            // Generate and download PDF
            const pdfUrl = await generateAndDownloadQuotationPdf(currentQuotationId, `quotation-${quotationData.quotationNumber || currentQuotationId}.pdf`)
            setSuccessMessage('PDF generated and downloaded successfully!')
        } catch (error) {
            console.error('Error exporting PDF:', error)
            setErrorMessage(error.message || 'Failed to export quotation PDF')
        } finally {
            setExportingPdf(false)
        }
    }

    const handleSendToClient = () => {
        setShowSendModal(true)
    }

    const handleSendQuotation = async (emailData) => {
        try {
            setLoading(true)
            setErrorMessage(null)

            // Validate required fields
            if (!quotationData.quotationDate || !quotationData.dueDate) {
                setErrorMessage('Please fill in quotation date and due date')
                setLoading(false)
                return
            }

            if (!quotationData.items || quotationData.items.length === 0) {
                setErrorMessage('Please add at least one item to the quotation')
                setLoading(false)
                return
            }

            // Validate studio information
            if (!quotationData.studio.name || !quotationData.studio.name.trim()) {
                setErrorMessage('Studio name is required')
                setLoading(false)
                return
            }

            if (!quotationData.studio.address || !quotationData.studio.address.trim()) {
                setErrorMessage('Studio address is required')
                setLoading(false)
                return
            }

            if (!quotationData.studio.phone || !quotationData.studio.phone.trim()) {
                setErrorMessage('Studio phone number is required')
                setLoading(false)
                return
            }

            let currentQuotationId = activeQuotationId || quotationId

            // Always save current changes as a new draft before sending
            const quotationToSave = {
                templateId: selectedTemplateId || (selectedTemplate?._id) || undefined,
                leadId: leadId,
                quotationDate: quotationData.quotationDate,
                dueDate: quotationData.dueDate,
                studio: {
                    name: quotationData.studio.name,
                    address: quotationData.studio.address,
                    gstNumber: quotationData.studio.gstNumber,
                    phone: quotationData.studio.phone,
                    logo: quotationData.studio.logo,
                    banner: quotationData.studio.banner
                },
                client: quotationData.client,
                clientId: quotationData.clientId || leadId,
                event: (quotationData.event.type || quotationData.event.date || quotationData.event.time || quotationData.event.location) ? {
                    type: quotationData.event.type || '',
                    date: quotationData.event.date || '',
                    time: quotationData.event.time || '',
                    location: quotationData.event.location || '',
                } : undefined,
                taxRate: quotationData.taxRate === '' || quotationData.taxRate === null ? 0 : Number(quotationData.taxRate) || 0,
                discount: {
                    enabled: quotationData.discount.enabled,
                    type: quotationData.discount.type,
                    value: quotationData.discount.value === '' || quotationData.discount.value === null ? 0 : Number(quotationData.discount.value) || 0
                },
                items: quotationData.items.map(item => {
                    const amount = item.amount === undefined || item.amount === null
                        ? (item.total === '' || item.total === null ? 0 : Number(item.total))
                        : Number(item.amount)
                    return {
                        event: item.event || item.description || '',
                        description: item.description || item.event || '',
                        date: item.date || undefined,
                        location: item.location || '',
                        crew: (item.crew || []).map(c => ({ name: c.name, cost: c.cost, pricingId: c.pricingId })),
                        equipment: (item.equipment || []).map(e => ({ name: e.name, cost: e.cost, pricingId: e.pricingId })),
                        packages: (item.packages || []).map(p => ({
                            name: p.name,
                            amount: p.amount,
                            pricingId: p.pricingId,
                            packageItems: p.packageItems || []
                        })),
                        amount: amount,
                        total: amount,
                        quantity: item.quantity || 1
                    }
                }),
                paymentMilestones: quotationData.paymentMilestones.map(milestone => ({
                    description: milestone.description,
                    dueDate: milestone.dueDate,
                    amount: milestone.amount === '' || milestone.amount === null ? 0 : Number(milestone.amount) || 0
                })),
                paymentMethods: quotationData.paymentMethods,
                deliverables: quotationData.deliverables.map(d => ({ description: d.description, quantity: d.quantity })),
                complimentary: quotationData.complimentary.map(c => ({ description: c.description, quantity: c.quantity || 1 })),
                notes: quotationData.notes || '',
                termsAndConditions: quotationData.termsAndConditions || '',
                customization: quotationData.customization,
                background: quotationData.background,
                quotationBackground: quotationData.quotationBackground || quotationData.background,
                serviceColumns: quotationData.serviceColumns,
                ...calculateTotals(quotationData)
            }

            // Update existing quotation if we already have an ID; otherwise create a new draft
            if (currentQuotationId) {
                await updateQuotation(currentQuotationId, quotationToSave)
            } else {
                const saved = await saveQuotationDraft(quotationToSave)
                currentQuotationId = saved.quotationId || saved._id || saved.data?.quotationId
                if (currentQuotationId) {
                    setActiveQuotationId(currentQuotationId)
                    window.history.replaceState({}, '', `/leads/${leadId}/quotation/${currentQuotationId}`)
                }
            }

            // Send the quotation via email
            try {
                await sendQuotation(currentQuotationId, emailData)
            } catch (sendError) {
                // Log the error but don't fail the entire operation
                // The quotation draft is already saved and email might have been sent
                console.warn('Send quotation API error (email may have been sent successfully):', sendError)
                // Check if it's a network error after successful send
                if (sendError.message?.includes('Network Error') || sendError.code === 'ERR_NETWORK') {
                } else {
                    // Re-throw if it's a real error
                    throw sendError
                }
            }

            setSuccessMessage('Quotation sent to client successfully!')
            setTimeout(() => {
                navigate(`/leads/${leadId}`, { state: { fromQuotation: true } })
            }, 1500)
        } catch (error) {
            console.error('Error sending quotation:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // Handlers for the local draft restore banner
    const handleRestoreDraft = () => {
        setQuotationData({
            ...pendingDraft,
            serviceColumns: {
                ...(pendingDraft.serviceColumns || {}),
                equipment: true
            }
        })
        setPendingDraft(null)
    }

    const handleDiscardDraft = () => {
        if (draftKey) localStorage.removeItem(draftKey)
        setPendingDraft(null)
    }

    // Format phone number: +91 {space} {number}
    const formatPhoneNumber = (phone) => {
        if (!phone) return ''
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '')
        // If starts with 91, add + and space
        if (digits.startsWith('91') && digits.length > 2) {
            return `+91 ${digits.slice(2)}`
        }
        // If doesn't start with 91, add +91 and space
        if (digits.length > 0) {
            return `+91 ${digits}`
        }
        return phone
    }

    // Normalize phone number for storage (remove +91 and spaces)
    const normalizePhoneNumber = (phone) => {
        if (!phone) return ''
        return phone.replace(/\+91\s?/g, '').replace(/\s/g, '')
    }

    return (
        <>
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

            {/* Draft restoration banner */}
            {pendingDraft && (
                <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-300 rounded-xl shadow-lg text-sm max-w-lg w-full'>
                    <span className='text-amber-800 font-medium flex-1'>
                        ⚡ We found an unsaved draft from your last session. Restore it?
                    </span>
                    <button
                        onClick={handleRestoreDraft}
                        className='px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors text-xs shrink-0'
                    >
                        Restore
                    </button>
                    <button
                        onClick={handleDiscardDraft}
                        className='px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 rounded-lg font-semibold transition-colors text-xs shrink-0'
                    >
                        Discard
                    </button>
                </div>
            )}

            <div className='h-screen bg-gray-50 flex flex-col overflow-hidden'>
                {/* Header with Breadcrumb - Always visible */}
                <div className='shrink-0 bg-white border-b border-gray-200 px-6 py-4'>
                    <div className='max-w-[1920px] mx-auto'>
                        <LeadBreadcrumb
                            leadId={leadId}
                            leadName={leadName || quotationData?.client?.name || lead?.name}
                            currentPage="Quotation"
                        />
                    </div>
                </div>

                {/* TWO PANEL WORKSPACE */}
                <div className='flex-1 flex flex-col lg:flex-row overflow-hidden relative'>

                    {/* Left Panel: Editor */}
                    <div className='w-full lg:w-1/2 border-r border-gray-200 bg-white flex flex-col'>
                        <div className='flex-1 overflow-y-auto'>
                            {loading ? (
                                <div className='p-6 space-y-4'>
                                    <Skeleton className='h-12 w-full' />
                                    <Skeleton className='h-32 w-full' />
                                    <Skeleton className='h-12 w-full' />
                                    <Skeleton className='h-40 w-full' />
                                </div>
                            ) : (
                                <QuotationEditor
                                    quotationData={quotationData}
                                    setQuotationData={setQuotationData}
                                    savingDraft={savingDraft}
                                    exportingPdf={exportingPdf}
                                    selectedTemplate={selectedTemplate}
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Preview */}
                    <div className='w-full lg:w-1/2 bg-gray-50 flex flex-col lg:border-t-0 border-t'>
                        {/* Right Panel Header: Primary Actions */}
                        <div className='shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-sm z-30 sticky top-0'>
                            <div className='flex items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={() => handleSaveDraft(false, false)}
                                    disabled={savingDraft || exportingPdf}
                                    className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm text-gray-700 disabled:opacity-50 hover:shadow-sm'
                                >
                                    {savingDraft ? <div className='animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-transparent'></div> : <Save size={16} />}
                                    {savingDraft ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button
                                    type='button'
                                    onClick={handleExportPDF}
                                    disabled={savingDraft || exportingPdf}
                                    className='flex items-center gap-2 px-4 py-2 border border-primary-dark text-primary-dark rounded-lg hover:bg-primary/5 transition-all font-medium text-sm disabled:opacity-50 hover:shadow-sm'
                                >
                                    {exportingPdf ? <div className='animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent'></div> : <Download size={16} />}
                                    {exportingPdf ? 'Exporting...' : 'Export PDF'}
                                </button>
                            </div>
                            <button
                                type='button'
                                onClick={handleSendToClient}
                                className='flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary transition-all font-medium text-sm shadow-sm'
                            >
                                <Send size={16} /> Send to Client
                            </button>
                        </div>

                        {/* Right Panel Header: Template & Auto-Save */}
                        <div className='shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-20 sticky top-[61px]'>
                            {/* Highlighted Template Selector */}
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1.5 mr-1'>
                                    <LayoutTemplate size={16} className='text-primary shrink-0' />
                                    <span className='text-xs font-bold text-gray-700 uppercase tracking-wide'>Template : </span>
                                </div>
                                <div className='relative'>
                                    <button
                                        onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                                        className='flex items-center gap-2 pl-3 pr-2 py-1.5 text-sm border-2 border-primary/40 rounded-lg bg-primary/5 text-primary-dark hover:border-primary/60 hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm font-medium'
                                    >

                                        <span>
                                            {selectedTemplate?.name || 'Select a template'}
                                        </span>
                                        <ChevronDown size={14} className='text-primary' />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showTemplateMenu && (
                                        <>
                                            <div
                                                className='fixed inset-0 z-40'
                                                onClick={() => setShowTemplateMenu(false)}
                                            />
                                            <div className='absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 font-medium'>
                                                <div className='px-4 py-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center'>
                                                    <span className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Available Templates</span>
                                                    <a href='/templates' target='_blank' rel='noreferrer' className='text-xs text-primary hover:underline flex items-center gap-1'>Manage</a>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        applyTemplate('')
                                                        setShowTemplateMenu(false)
                                                    }}
                                                    className='w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors border-b border-gray-100 flex items-center gap-2'
                                                >
                                                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${!selectedTemplateId ? 'border-primary' : 'border-gray-300'}`}>
                                                        {!selectedTemplateId && <span className='w-2 h-2 rounded-full bg-primary'></span>}
                                                    </span>
                                                    Default (No Template)
                                                </button>
                                                {availableTemplates.map(t => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => {
                                                            applyTemplate(t.id)
                                                            setShowTemplateMenu(false)
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedTemplateId === t.id ? 'text-primary bg-primary/5' : 'text-gray-700'
                                                            }`}
                                                    >
                                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedTemplateId === t.id ? 'border-primary' : 'border-gray-300'}`}>
                                                            {selectedTemplateId === t.id && <span className='w-2 h-2 rounded-full bg-primary'></span>}
                                                        </span>
                                                        <span className='truncate'>{t.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Auto Save Toggle */}
                            <label className='flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm'>
                                <span className='text-sm font-semibold text-gray-700'>Auto Save</span>
                                <div className='relative'>
                                    <input
                                        type='checkbox'
                                        className='sr-only'
                                        checked={autoSaveEnabled}
                                        onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                                    />
                                    <div className={`block w-10 h-5 rounded-full transition-colors ${autoSaveEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${autoSaveEnabled ? 'transform translate-x-5' : ''}`}></div>
                                </div>
                            </label>
                        </div>

                        <div className='flex-1 overflow-y-auto'>
                            {loading ? (
                                <div className='p-6 space-y-4'>
                                    <Skeleton className='h-24 w-full' />
                                    <Skeleton className='h-32 w-full' />
                                    <Skeleton className='h-40 w-full' />
                                </div>
                            ) : (
                                <QuotationPreview quotationData={quotationData} selectedTemplate={selectedTemplate} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Send Quotation Modal */}
            <SendQuotationModal
                isOpen={showSendModal}
                onClose={() => setShowSendModal(false)}
                quotationData={quotationData}
                onSend={handleSendQuotation}
            />
        </>
    )
}
