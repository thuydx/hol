import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@sprite': path.resolve(__dirname, 'node_modules/@coreui/icons-pro/sprites'),
            '@free': path.resolve(__dirname, 'node_modules/@coreui/icons/sprites')
        }
    },
    plugins: [
        laravel({
            input: ['resources/sass/app.scss', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
