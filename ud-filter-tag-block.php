<?php
/**
 * Plugin Name:     UD Block: Filter-Tag
 * Description:     Klickbares Filter-Element mit Label und zugewiesenem Tag, z. B. für Inhaltsfilterung mit Isotope.js.
 * Version:         1.0.0
 * Author:          ulrich.digital gmbh
 * Author URI:      https://ulrich.digital/
 * License:         GPL v2 or later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     filter-tag-block-ud
 */


defined('ABSPATH') || exit;

// Aktivierung blockieren, falls ud-shared-api nicht aktiv ist
register_activation_hook(__FILE__, 'ud_filter_tag_block_activate');

function ud_filter_tag_block_activate() {
    include_once(ABSPATH . 'wp-admin/includes/plugin.php');

    if (!is_plugin_active('ud-shared-api/ud-shared-api.php')) {
        wp_die(
            __('Aktivierung fehlgeschlagen: Das Plugin "Filter-Tag Block" benötigt "ud-shared-api". Bitte aktiviere zuerst "ud-shared-api".', 'ud-filter-tag-block'),
            __('Plugin-Aktivierung abgebrochen', 'ud-filter-tag-block'),
            ['back_link' => true]
        );
    }
}

// Laufzeitprüfung: Falls ud-shared-api deaktiviert wurde, Hinweis ausgeben & Plugin nicht laden
include_once(ABSPATH . 'wp-admin/includes/plugin.php');

if (!is_plugin_active('ud-shared-api/ud-shared-api.php')) {
    add_action('admin_notices', function () {
        echo '<div class="notice notice-error"><p>';
        echo esc_html__('Das Plugin "Filter-Tag Block" benötigt das Plugin "ud-shared-api", um korrekt zu funktionieren. Bitte aktiviere es zuerst.', 'ud-filter-tag-block');
        echo '</p></div>';
    });
    return;
}

// Plugin-Funktionalitäten laden
foreach ([
    'helpers.php',
    'block-register.php',
    'enqueue.php'
] as $file) {
    require_once __DIR__ . '/includes/' . $file;
}
