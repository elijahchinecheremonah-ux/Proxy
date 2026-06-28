const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// ===== EVERY POSSIBLE ENDPOINT THE GAME MIGHT REQUEST =====

// 1. Main config endpoints
app.get('/config2', configHandler);
app.get('/config', configHandler);
app.get('/v2/config', configHandler);
app.get('/api/config', configHandler);
app.get('/api/v2/config', configHandler);

// 2. Version endpoints
app.get('/version', versionHandler);
app.get('/v2/version', versionHandler);
app.get('/api/version', versionHandler);
app.get('/api/v2/version', versionHandler);

// 3. Verify/check endpoints
app.get('/verify', verifyHandler);
app.get('/check', verifyHandler);
app.get('/api/verify', verifyHandler);
app.get('/status', verifyHandler);

// 4. Injection endpoints
app.get('/inject', injectHandler);
app.get('/api/inject', injectHandler);
app.get('/payload', injectHandler);

// 5. Auth/key endpoints
app.get('/auth', authHandler);
app.get('/key', authHandler);
app.get('/api/auth', authHandler);
app.get('/license', authHandler);

// 6. Catch ALL other routes - return config anyway
app.get('*', configHandler);
app.post('*', configHandler);

// === HANDLERS ===

function configHandler(req, res) {
    console.log(`[CONFIG] Request from: ${req.ip} - Path: ${req.path}`);
    res.json({
        status: "success",
        message: "config_loaded",
        version: "3.0",
        build: "brutal",
        config: {
            body_headshot: true,
            force_headshot: true,
            body_to_head: true,
            all_hit_zones_to_head: true,
            head_hitbox_scale: 10000,
            body_hitbox_scale: 0.001,
            leg_hitbox_scale: 0.0001,
            arm_hitbox_scale: 0.0001,
            aim_lock: true,
            aim_smoothness: 0,
            aim_distance: 999,
            aim_fov: 0.01,
            no_recoil: true,
            no_spread: true,
            no_sway: true,
            no_flinch: true,
            damage_multiplier: 10,
            bullet_tp: true,
            silent_aim: true,
            magnet_strength: 200,
            awm_damage: 99999,
            awm_headshot_mult: 99999,
            awm_bullet_speed: 99999,
            awm_wall_pen: true,
            all_weapons_headshot: true,
            esp_enabled: true,
            wallhack: true,
            radar_enabled: true,
            speed_multiplier: 1.5,
            jump_multiplier: 1.5,
            no_fall_damage: true,
            anti_ban: true,
            delay_injection: 5,
            hide_panel: true,
            clear_logs: true,
            offline_mode: true,
            license: "free",
            bypass_key: true,
            key_required: false
        },
        endpoints: {
            config: "/config2",
            inject: "/inject",
            verify: "/verify"
        }
    });
}

function versionHandler(req, res) {
    console.log(`[VERSION] Request from: ${req.ip} - Path: ${req.path}`);
    res.json({
        status: "success",
        version: "3.0",
        build: "brutal",
        release_date: "2026-06-28",
        required_version: "1.0",
        update_available: false,
        force_update: false,
        server_status: "online",
        message: "Latest version"
    });
}

function verifyHandler(req, res) {
    console.log(`[VERIFY] Request from: ${req.ip} - Path: ${req.path}`);
    res.json({
        status: "success",
        verified: true,
        authenticated: true,
        license_valid: true,
        expires: "never",
        device_linked: false,
        message: "Access granted"
    });
}

function injectHandler(req, res) {
    console.log(`[INJECT] Request from: ${req.ip} - Path: ${req.path}`);
    res.json({
        status: "success",
        injecting: true,
        payload: {
            memory_patches: [
                { address: "0x0A3F7B1C", value: -1.0, type: "float", desc: "view_pitch" },
                { address: "0x0A3F7B20", value: 0.0, type: "float", desc: "view_yaw" },
                { address: "0x0E2A4F80", value: 5, type: "int", desc: "head_bone" },
                { address: "0x0D1C8A40", value: 1, type: "int", desc: "aim_target" },
                { address: "0x0D2F8000", value: 1, type: "int", desc: "bullet_tp" },
                { address: "0x0B3F2000", value: 0.0, type: "float", desc: "no_recoil" },
                { address: "0x0A3F7B24", value: 0.0, type: "float", desc: "smoothness" },
                { address: "0x0A4F7000", value: 0.1, type: "float", desc: "fov" },
                { address: "0x0C4E1000", value: 1, type: "int", desc: "lock_enable" },
                { address: "0x0D3A9000", value: 100.0, type: "float", desc: "magnet" }
            ],
            config_overrides: {
                body_to_head: true,
                head_scale: 10000,
                body_scale: 0.001
            }
        }
    });
}

function authHandler(req, res) {
    console.log(`[AUTH] Request from: ${req.ip} - Path: ${req.path}`);
    res.json({
        status: "success",
        authenticated: true,
        key_valid: true,
        key_type: "premium",
        expires: "never",
        device_limit: 999,
        message: "Authentication successful"
    });
}

// Root
app.get('/', (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>FF Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { background:#000; color:#0f0; font-family:monospace; padding:20px; }
            h1 { color:#0ff; }
            code { background:#111; padding:10px; display:block; margin:10px 0; word-break:break-all; color:#0ff; }
            .status { color:#0f0; }
            .error { color:#f00; }
        </style>
    </head>
    <body>
        <h1>⚡ FF PANEL</h1>
        <p class="status">✅ Server Online</p>
        <p class="status">✅ All Endpoints Active</p>
        <p class="status">✅ Body Headshot: ON</p>
        <hr>
        <p>Your verAddr:</p>
        <code>${url}</code>
        <p>Paste this into localconfig.json:</p>
        <code>{"verAddr": "${url}"}</code>
        <hr>
        <p>Test endpoints:</p>
        <p><a href="/config2" style="color:#0ff;">/config2</a></p>
        <p><a href="/version" style="color:#0ff;">/version</a></p>
        <p><a href="/verify" style="color:#0ff;">/verify</a></p>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Panel running on port ${PORT}`);
    console.log(`✅ All endpoints ready`);
    console.log(`✅ Game will connect successfully`);
});