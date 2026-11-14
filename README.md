# ANDY 8

ANDY 8 is a Fall 2026 senior-project website documenting a fault-tolerant, three-drone telemetry mesh. The system design uses PX4 on a MicroAir743v2 flight controller, ESP32-S3 communications nodes, SX1262 LoRa radios, and MAVLink telemetry.

The website includes:

- An animated system walkthrough and interactive 3D design visualization
- Network architecture, message flow, and relay-failure recovery views
- A clearly labeled software-simulation dashboard with CSV export
- Development, testing, documentation, and team pages

## Live sites

- GitHub Pages: <https://drones-dev.github.io/ANDY-8/>
- Private project preview: <https://andy-8-project.gadimani.chatgpt.site/>

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The dashboard values are illustrative software-simulation outputs, not physical flight-test evidence. Measured results should replace them only after controlled trials are completed and documented.

## License

MIT — see [LICENSE](LICENSE).
