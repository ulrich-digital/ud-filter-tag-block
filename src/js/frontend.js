/* =============================================================== *\ 
   Filter-Buttons für .filter-button-group

   Dieses Modul setzt nur den Zustand pro Gruppe
   Architektur: Bottom-up, entkoppelt via globalem Event
   Aufgaben: 
		Aktivierung/Deaktivierung von Filtern
		visuelles Feedback,
        Triggern des globalen "global-filter-change"-Events
\* =============================================================== */

import $ from "jquery";

document.addEventListener("DOMContentLoaded", function () {
  $(".filter-button-group").each(function () {
    const $group = $(this);

    $group.on("click", "[data-filter]", function () {
      const $btn = $(this);
      const clickedValue = $btn.data("filter");
      const currentValue = $group.attr("data-current-filter");

      const isSame = clickedValue === currentValue;
      const newValue = isSame ? "*" : clickedValue;

      // Neuen Zustand setzen
      $group.attr("data-current-filter", newValue);

      // Visueller Status
      $group.find("[data-filter]").removeClass("is-active");
      if (!isSame) $btn.addClass("is-active");

      // Globales Event feuern, das andere Komponenten auswerten
      $(document).trigger("global-filter-change");
    });
  });

  // Einmaliges Initial-Event
  $(document).trigger("global-filter-change");
});