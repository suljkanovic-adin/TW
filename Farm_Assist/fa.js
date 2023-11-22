function clickFarmIcons() {
    let farmIcons = document.querySelectorAll('.farm_icon_a');
    console.log(`Found ${farmIcons.length} farm icons to click.`);

    farmIcons.forEach((icon, index) => {
        setTimeout(() => {
            console.log(`Clicking farm icon #${index + 1}`);
            icon.click();
        }, index * 1000); // 1 second delay between each click
    });

    return farmIcons.length * 1000; // Total time taken to click all icons
}

function refreshPageAfterClicks() {
    let totalClickTime = clickFarmIcons();
    console.log(`Will attempt to refresh the page in ${totalClickTime + 5000} milliseconds.`);

    setTimeout(() => {
        console.log('Attempting to refresh the page now.');
        window.location.href = window.location.href; // Alternative refresh method
    }, totalClickTime + 5000); // 5 seconds after the last click
}

const refreshInterval = 10000; // 60 seconds

setInterval(() => {
    refreshPageAfterClicks();
}, refreshInterval);

refreshPageAfterClicks(); // Initial call to start the process
