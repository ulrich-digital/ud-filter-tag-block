<?php
/**
 * Enqueue styles and scripts for block editor and frontend
 */

defined('ABSPATH') || exit;


add_action('enqueue_block_editor_assets', function () {
    wp_localize_script(
        'ud-filter-tag-block-editor-script', // exakt dieser Handle!
        'udFilterTagBlockSettings', // 👈 eindeutiger Name
        [
            'nonce' => wp_create_nonce('wp_rest'),
        ]
    );
});

