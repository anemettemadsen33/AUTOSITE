<x-mail::message>
# Confirmare Comandă

Bună **{{ $buyerName }}**,

Comanda dvs. a fost înregistrată cu succes!

<x-mail::panel>
## Detalii Comandă

**Număr Factură:** {{ $order->invoice_number }}  
**Vehicul:** {{ $vehicleTitle }}  
**Preț:** €{{ number_format($order->vehicle_price, 2) }}  
@if($order->vat_amount > 0)
**TVA (19%):** €{{ number_format($order->vat_amount, 2) }}  
@endif
**Taxă procesare:** €{{ number_format($order->processing_fee, 2) }}  

### **TOTAL DE PLATĂ:** €{{ number_format($order->total_amount, 2) }}
</x-mail::panel>

## Instrucțiuni de Plată

Vă rugăm efectuați plata prin transfer bancar la următoarele date:

**Beneficiar:** AUTOSITE MARKETPLACE SRL  
**IBAN:** RO49 AAAA 1B31 0075 9384 0000  
**Bancă:** Banca Comercială Română  
**Referință:** {{ $order->invoice_number }}

⚠️ **Important:** Menționați numărul facturii în descrierea transferului!

## Pașii Următori

1. ✅ Comanda înregistrată
2. ⏳ Efectuați plata (transfer bancar)
3. ⏳ Confirmare plată (1-2 zile lucrătoare)
4. ⏳ Pregătire vehicul
5. ⏳ Programare predare
6. 🎉 Ridicare vehicul

Veți fi contactat telefonic pentru programarea predării după confirmarea plății.

<x-mail::button :url="'http://127.0.0.1:8000/admin'">
Vezi Comandă
</x-mail::button>

Mulțumim că ați ales AUTOSITE!

Cu stimă,  
**Echipa AUTOSITE**

---

*Acest email a fost generat automat. Dacă aveți întrebări, contactați-ne la support@autosite.com*
</x-mail::message>
