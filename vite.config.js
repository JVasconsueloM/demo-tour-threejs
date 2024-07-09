import { resolve } from 'path'
import { defineConfig } from 'vite'



export default defineConfig({
    assetsInclude: [
        'assets/**', // Include all files in assets directory
        'assets/abandoned_warehouse_-_interior_scene-out.glb', // Include specific GLB file
    ],
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                chart: './chart.html',
            },
        },
    },
})