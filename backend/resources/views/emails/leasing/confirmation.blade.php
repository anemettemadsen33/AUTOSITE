<x-mail::message>
# Confirmare Aplicare Leasing

Bună **{{ $applicantName }}**,

Aplicația dvs. pentru leasing a fost primită cu succes!

<x-mail::panel>
## Detalii Aplicare

**Număr Referință:** #{{ $application->id }}  
**Vehicul:** {{ $vehicleTitle }}  
**Preț vehicul:** €{{ number_format($application->vehicle_price, 2) }}  

### Termeni Leasing Solicitați

**Avans ({{ $application->down_payment_percentage }}%):** €{{ $downPayment }}  
**Perioadă:** {{ $application->term_months }} luni  
**Dobândă anuală:** {{ $application->apr }}%  

### **RATĂ LUNARĂ ESTIMATĂ:** €{{ $monthlyPayment }}
</x-mail::panel>

## Ce Urmează?

Aplicația dvs. va fi procesată astfel:

1. ✅ Aplicație primită
2. ⏳ **Verificare documente** (24-48 ore)
3. ⏳ **Credit scoring** (soft check)
4. ⏳ **Evaluare financiară**
5. ⏳ **Decizie finală**
6. 📧 **Vă vom contacta** cu rezultatul

## Documente Necesare

@if($application->applicant_type === 'individual')
Pentru finalizarea aplicației, vă rugăm pregătiți:
- ✓ Carte identitate (față + verso)
- ✓ Adeverință venit (ultimele 3 luni)
- ✓ Dovadă domiciliu (factură utilități)
@else
Pentru finalizarea aplicației, vă rugăm pregătiți:
- ✓ Certificat înregistrare firmă
- ✓ Bilanț contabil (ultimele 2 exerciții)
- ✓ Împuternicire reprezentant legal
@endif

**📞 Veți fi contactat de un consultant în maximum 48 ore** pentru următorii pași.

<x-mail::button :url="'http://127.0.0.1:8000/admin'">
Vezi Aplicația
</x-mail::button>

## Informații Utile

**Avans minim:** 30% din valoarea vehiculului  
**Perioadă maximă:** 84 luni (7 ani)  
**Aprobare estimată:** 3-5 zile lucrătoare  
**Vârstă minimă:** 18 ani (PF) / 1 an vechime (companie)

---

**Aveți întrebări?**  
📧 Email: leasing@autosite.com  
📞 Telefon: +40 123 456 789  
🕒 Program: Luni-Vineri, 09:00-18:00

Mulțumim pentru încredere!

Cu stimă,  
**Echipa AUTOSITE Leasing**

---

*Acest email a fost generat automat. Rata lunară este orientativă și poate varia în funcție de evaluarea finală.*
</x-mail::message>
