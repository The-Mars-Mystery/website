// Maintenance Mode Configuration
const isMaintenanceMode = true; // Set to `true` to enable maintenance mode

if (isMaintenanceMode) {
    // Redirect all pages to the maintenance page
    const currentPage = window.location.pathname;
    if (currentPage !== '/maintenance') {
        window.location.href = '/maintenance';
    }
}