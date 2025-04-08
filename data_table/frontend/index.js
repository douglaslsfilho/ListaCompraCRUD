window.addEventListener('load',()=>{
    registerSW()
})
async function registerSW(){
    if('serviceworker' in navigator){
        try{
            await navigator.serviceWorker.register('./sw.js')
        } catch(e){
            console.log('SW registration failed');
        }
    }
    
}