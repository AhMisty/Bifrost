import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default NProgress.configure({
    easing: "ease",
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
    parent: 'body',
})