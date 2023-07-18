// keep screen on
try {
    const browserNav: any = navigator;
    if ('wakeLock' in navigator) {
        browserNav['wakeLock'].request('screen');
    }
} catch (err) {
    // the wake lock request fails - usually system related, such being low on battery
    console.log(`${err}`);
}
