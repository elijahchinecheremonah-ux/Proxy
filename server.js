const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow all origins (important for game connections)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// === CRITICAL: The game looks for "config2" endpoint ===
app.get('/config2', (req, res) => {
    res.json({
        status: "success",
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
            aim_lock: true,
            aim_smoothness: 0,
            aim_distance: 999,
            aim_fov: 0.01,
            no_recoil: true,
            no_spread: true,
            damage_multiplier: 10,
            bullet_tp: true,
            silent_aim: true,
            magnet_strength: 200,
            awm_damage: 99999,
            awm_headshot_mult: 99999,
            awm_bullet_speed: 99999,
            awm_wall_pen: true,
            all_weapons_headshot: true,
            anti_ban: true,
            delay_injection: 5
        }
    });
});

// Also serve /version and /config (some panels check these)
app.get('/version', (req, res) => {
    res.json({
        version: "3.0",
        build: "brutal",
        status: "active"
    });
});

app.get('/config', (req, res) => {
    res.json({
        status: "success",
        config: {
            body_headshot: true,
            force_headshot: true
        }
    });
});

// Root endpoint for the web panel
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>FF Panel</title></head>
    <body style="background:#000;color:#0f0;font-family:monospace;padding:20px;">
        <h1>⚡ FF PANEL</h1>
        <p>Status: ✅ Online</p>
        <p>Version: 3.0</p>
        <p>Body Headshot: Active</p>
        <hr>
        <p>Your verAddr:</p>
        <code style="background:#111;padding:10px;display:block;margin:10px 0;">
            ${req.protocol}://${req.get('host')}
        </code>
        <p>Paste this into localconfig.json</p>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Panel running on port ${PORT}`);
    console.log(`✅ Config2 endpoint ready`);
});