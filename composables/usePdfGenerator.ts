import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import type { WindowSelection, ClientType } from '~/types/Windows.types'
import { useBusinessRules } from '~/composables/useBusinessRules'
import { useWindowPricing } from '~/composables/useWindowPricing'

interface QuoteData {
  selectedWindows: WindowSelection[]
  clientType: ClientType
  grandTotal: string
  customerEmail?: string
  quoteDate: Date
  quoteNumber: string
}

export const usePdfGenerator = () => {
  const { businessRules } = useBusinessRules()
  const windowPricing = useWindowPricing()

  const generateQuotePDF = async (quoteData: QuoteData): Promise<Uint8Array> => {
    // 1. Créer le document PDF
    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage([595, 842]) // A4: 210x297mm
    const { width, height } = page.getSize()

    // 2. Charger les polices
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // 3. Constantes de layout
    const margin = 50
    let yPosition = height - margin

    // 4. Header - Logo + Info entreprise
    page.drawText('MAXIVITRE', {
      x: margin,
      y: yPosition,
      size: 24,
      font: fontBold,
      color: rgb(0.07, 0.81, 0.98) // #12CEF9
    })
    yPosition -= 15

    page.drawText('Spécialiste nettoyage extérieur pour commerces', {
      x: margin,
      y: yPosition,
      size: 10,
      font
    })
    yPosition -= 30

    // Contact info (à droite)
    const contactX = width - margin - 150
    page.drawText(businessRules.business.phone, {
      x: contactX,
      y: height - margin,
      size: 10,
      font
    })
    page.drawText(businessRules.business.email, {
      x: contactX,
      y: height - margin - 15,
      size: 10,
      font
    })
    page.drawText(businessRules.business.location, {
      x: contactX,
      y: height - margin - 30,
      size: 10,
      font
    })

    // 5. Titre DEVIS
    yPosition -= 20
    page.drawText('DEVIS', {
      x: margin,
      y: yPosition,
      size: 20,
      font: fontBold
    })
    yPosition -= 25

    // 6. Métadonnées devis
    page.drawText(`N° ${quoteData.quoteNumber}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font
    })
    yPosition -= 15

    const dateStr = quoteData.quoteDate.toLocaleDateString('fr-FR')
    page.drawText(`Date: ${dateStr}`, {
      x: margin,
      y: yPosition,
      size: 10,
      font
    })
    yPosition -= 15

    const expiryDate = new Date(quoteData.quoteDate)
    expiryDate.setDate(expiryDate.getDate() + businessRules.constraints.quoteValidityDays)
    page.drawText(`Valable jusqu'au: ${expiryDate.toLocaleDateString('fr-FR')}`, {
      x: margin,
      y: yPosition,
      size: 10,
      font
    })
    yPosition -= 15

    // Badge client type
    const clientLabel = quoteData.clientType === 'professionnel'
      ? 'Client Professionnel (-15%)'
      : 'Client Particulier'
    page.drawText(clientLabel, {
      x: margin,
      y: yPosition,
      size: 10,
      font: fontBold,
      color: rgb(0.07, 0.81, 0.98)
    })
    yPosition -= 40

    // 7. Tableau des fenêtres
    page.drawText('DÉTAIL DES PRESTATIONS', {
      x: margin,
      y: yPosition,
      size: 12,
      font: fontBold
    })
    yPosition -= 20

    // Ligne de séparation
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: width - margin, y: yPosition },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8)
    })
    yPosition -= 15

    // En-têtes du tableau
    const colX = {
      desc: margin,
      qty: margin + 250,
      unit: margin + 320,
      total: margin + 420
    }

    page.drawText('Description', { x: colX.desc, y: yPosition, size: 9, font: fontBold })
    page.drawText('Qté', { x: colX.qty, y: yPosition, size: 9, font: fontBold })
    page.drawText('Prix unit.', { x: colX.unit, y: yPosition, size: 9, font: fontBold })
    page.drawText('Total', { x: colX.total, y: yPosition, size: 9, font: fontBold })
    yPosition -= 15

    // Lignes de fenêtres
    for (const window of quoteData.selectedWindows) {
      // Vérifier espace restant
      if (yPosition < 100) {
        // Nouvelle page si nécessaire
        page = pdfDoc.addPage([595, 842])
        yPosition = height - margin
      }

      // Description complète
      const desc = `${window.name} - ${windowPricing.getSizeLabel(window.size)} - ${windowPricing.getCleaningTypeLabel(window.cleaningType)}`
      page.drawText(desc, { x: colX.desc, y: yPosition, size: 8, font })

      // Quantité
      page.drawText(window.quantity.toString(), { x: colX.qty, y: yPosition, size: 8, font })

      // Prix unitaire (prix total / quantité)
      const totalPrice = parseFloat(windowPricing.calculateTotalPrice(window, quoteData.clientType))
      const unitPrice = (totalPrice / window.quantity).toFixed(2)
      page.drawText(`${unitPrice}€`, { x: colX.unit, y: yPosition, size: 8, font })

      // Total
      page.drawText(`${totalPrice.toFixed(2)}€`, { x: colX.total, y: yPosition, size: 8, font })

      yPosition -= 12
    }

    yPosition -= 10

    // 8. Ligne de séparation avant total
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: width - margin, y: yPosition },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8)
    })
    yPosition -= 20

    // 9. Total général
    page.drawText('TOTAL TTC', {
      x: colX.unit,
      y: yPosition,
      size: 14,
      font: fontBold
    })
    page.drawText(`${quoteData.grandTotal}€`, {
      x: colX.total,
      y: yPosition,
      size: 14,
      font: fontBold,
      color: rgb(0.07, 0.81, 0.98)
    })
    yPosition -= 40

    // 10. Conditions de paiement (si > 500€)
    const total = parseFloat(quoteData.grandTotal)
    if (total >= businessRules.constraints.depositThreshold) {
      const deposit = (total * businessRules.constraints.depositPercentage).toFixed(2)
      page.drawText(`Acompte de 30% requis: ${deposit}€`, {
        x: margin,
        y: yPosition,
        size: 9,
        font: fontBold
      })
      yPosition -= 15
    }

    // 11. Footer - Conditions générales
    yPosition = 80
    page.drawText('Conditions:', {
      x: margin,
      y: yPosition,
      size: 8,
      font: fontBold
    })
    yPosition -= 12

    const conditions = [
      `• Devis valable ${businessRules.constraints.quoteValidityDays} jours`,
      '• Prix TTC incluant déplacement',
      '• Paiement à la fin de l\'intervention',
      '• TVA non applicable (article 293B du CGI)'
    ]

    for (const condition of conditions) {
      page.drawText(condition, {
        x: margin,
        y: yPosition,
        size: 7,
        font
      })
      yPosition -= 10
    }

    // 12. Sauvegarder le PDF
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
  }

  return {
    generateQuotePDF
  }
}
