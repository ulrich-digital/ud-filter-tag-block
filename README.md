# Filter-Tag Block

Filtert `wp-block-ud-link-block`-Elemente im Editor per Tag – unterstützt Akkordeon-Blöcke und filterbare Gruppen.

---

## Beschreibung

Das Plugin stellt einen Block zur Verfügung, mit dem sich Link-Blöcke im Editor anhand frei definierter Tags filtern lassen. Die Tags stammen aus einer zentralen REST-Schnittstelle und können im Editor frei kombiniert, sortiert und zugewiesen werden.

---

## Editor-Funktionalität

Der Block **Filter-Tag** wird im Gutenberg-Editor verwendet. Die Konfiguration erfolgt vollständig im Editor-UI.

### Filter anlegen

- Klick auf das **„+“-Symbol** öffnet ein Popover zur Eingabe eines neuen Filters:
  - **Anzeigetext** (frei wählbar)
  - **Filter-Tag** (muss vorhanden sein)
- Tags werden aus `/wp-json/ud-shared/v1/tags` geladen

![Filter-UI im Editor](assets/img/editor.png)
*Abbildung 1: Übersicht mit konfigurierten Filtern und Zielauswahl*

![Filter hinzufügen](assets/img/editor-filter_hinzufugen.png)
*Abbildung 2: Eingabe eines neuen Filters (Label + Tag)*


### Filter sortieren

- Filter lassen sich per **Drag & Drop** verschieben
- Die Reihenfolge bestimmt die Anzeigereihenfolge im Frontend

---

## Filterziele

Die Filter wirken auf zwei verschiedene Zieltypen, die im Block-Inspector aktiviert werden können.

### Filterbare Gruppen

- Funktioniert mit dem WordPress-Block `core/group`
- Der Gruppen-Block muss den Stil „Filterbar“ tragen
- Dieser Stil wird durch dieses Plugin mitgeliefert
- Die Filterung erfolgt via Isotope (`layoutMode: masonry`)

### Akkordeon-Blöcke

- Wird unterstützt, wenn das Plugin `ud-accordion-block` installiert ist
- Akkordeons mit sichtbaren Treffern werden automatisch geöffnet
- Verschachtelungen werden korrekt behandelt

---

## REST-API

Die verfügbaren Tags werden automatisch über folgenden Endpunkt geladen:

```
/wp-json/ud-shared/v1/tags
````

Dieser Endpunkt wird vom Plugin Shared API bereitgestellt.
Ist dieses Plugin aktiv, steht die Tag-Liste ohne weitere Konfiguration zur Verfügung.

Ein gültiger Nonce zur Authentifizierung wird über
```js
window.udLinkBlockSettings.nonce
````
automatisch bereitgestellt.

### Integration
Das Plugin Link Block registriert seine Tags in der Shared API.
Weitere Plugins können den Endpunkt ebenfalls erweitern, indem sie Tags dort hinzufügen.

