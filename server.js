const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// The main config endpoint - THIS is what the game connects to
app.get('/config', (req, res) => {
    res.json({
        status: "active",
        version: "3.0",
        body_headshot: true,
        config: {
            aim: {
                headshot: {
                    enabled: true,
                    mode: "brutal",
                    chance: 100,
                    body_to_head: true,
                    all_hit_zones_to_head: true
                },
                aimbot: {
                    enabled: true,
                    type: "critical",
                    lock_bone: "head",
                    lock_distance: 999,
                    lock_fov: 0.01,
                    smoothness: 0,
                    snap: true,
                    snap_speed: 999
                },
                no_recoil: true,
                no_spread: true,
                damage_multiplier: 10,
                bullet_tp: true,
                silent_aim: true,
                magnet: {
                    enabled: true,
                    strength: 200
                }
            },
            hitbox: {
                head: { radius: 100, height: 100, scale: 10000 },
                body: { radius: 0.001, height: 0.001, scale: 0.001 },
                neck: { radius: 0.001, height: 0.001 },
                chest: { radius: 0.001, height: 0.001 },
                stomach: { radius: 0.001, height: 0.001 },
                legs: { radius: 0.0001, scale: 0.0001 },
                arms: { radius: 0.0001, scale: 0.0001 }
            },
            weapon: {
                force_headshot: true,
                body_to_head: true,
                awm: {
                    damage: 99999,
                    headshot_mult: 99999,
                    bullet_speed: 99999,
                    wall_pen: true,
                    one_tap: true
                },
                all_weapons: {
                    no_recoil: true,
                    no_spread: true,
                    bullet_tp: true
                }
            },
            esp: {
                enabled: true,
                box: true,
                line: true,
                distance: true,
                name: true,
                health: true,
                enemy_only: true
            },
            radar: {
                enabled: true,
                zoom: 300,
                show_enemies: true
            },
            movement: {
                speed_multiplier: 1.5,
                jump_multiplier: 1.5,
                no_fall_damage: true
            },
            visuals: {
                no_fog: true,
                no_grass: true,
                brightness: 200
            },
            anti_ban: {
                enabled: true,
                hide_panel: true,
                clear_logs: true,
                delay_injection: 5
            }
        }
    });
});

// Injection endpoint - sends payload to the game
app.get('/inject', (req, res) => {
    res.json({
        status: "injecting",
        payload: {
            memory_patches: [
                { address: "0x0A3F7B1C", value: -1.0, type: "float" },
                { address: "0x0A3F7B20", value: 0.0, type: "float" },
                { address: "0x0E2A4F80", value: 5, type: "int" },
                { address: "0x0D1C8A40", value: 1, type: "int" },
                { address: "0x0D2F8000", value: 1, type: "int" },
                { address: "0x0B3F2000", value: 0.0, type: "float" },
                { address: "0x0A3F7B24", value: 0.0, type: "float" },
                { address: "0x0A4F7000", value: 0.1, type: "float" },
                { address: "0x0C4E1000", value: 1, type: "int" },
                { address: "0x0D3A9000", value: 100.0, type: "float" }
            ],
            config_overrides: {
                body_to_head: true,
                head_hitbox_scale: 10000,
                body_hitbox_scale: 0.001
            }
        }
    });
});

// Status endpoint
app.get('/status', (req, res) => {
    res.json({
        server: "online",
        version: "3.0",
        connected: true,
        body_headshot: true
    });
});

// Web interface
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`✅ Panel running on port ${PORT}`);
});