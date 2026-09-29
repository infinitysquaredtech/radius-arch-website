import HTMLFlipBook from 'react-pageflip';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen flex items-center justify-center"><p>Something went wrong</p></div>;
    }
    return this.props.children;
  }
}

const PageCover = React.forwardRef((props, ref) => {
    return (
    <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content flipbook-page-cover-content-wrap">
            {props.children}
        </div>
    </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
    <div className="page" ref={ref}>
        <div className="page-content flipbook-page-content-center">
        {/* <h2 className="page-header">Page header - {props.number}</h2> */}
        <div className="page-image-wrapper">
            {props.imageChildren}
        </div>
        <div className="page-text">{props.children}</div>
        {/* <div className="page-footer">{props.number + 1}</div> */}
        </div>
    </div>
    );
});

function MyBook(props) {
    try {
        const [controlsVisible, setControlsVisible] = React.useState(false);
        const hideTimerRef = React.useRef(null);

        const showControls = React.useCallback(() => {
            setControlsVisible(true);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
        }, []);

        React.useEffect(() => {
            const handleActivity = () => showControls();
            window.addEventListener('mousemove', handleActivity);
            window.addEventListener('touchstart', handleActivity);
            window.addEventListener('touchmove', handleActivity);
            return () => {
                window.removeEventListener('mousemove', handleActivity);
                window.removeEventListener('touchstart', handleActivity);
                window.removeEventListener('touchmove', handleActivity);
                if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            };
        }, [showControls]);

        

        return (
            <div className="min-h-screen flex items-center justify-center overflow-hidden flipbook-book-shell">
                <HTMLFlipBook
                    width={816}
                    height={960}
                    size="stretch"
                    minWidth={180.2}
                    maxWidth={816}
                    minHeight={212}
                    maxHeight={960}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    // onFlip={(e) => console.log('Current page: ' + e.data)}
                    // onChangeOrientation={(e) => console.log('Orientation: ' + e.data)}
                    // onChangeState={(e) => console.log('State: ' + e.data)}
                    ref={(component) => (this.pageFlip = component)}
                    className="demo-book"
                >
                    <PageCover>
                        <div className="flipbook-cover-base flipbook-cover-front">
                            {/* Decorative border */}
                            <div className="flipbook-cover-border" />
                            {/* Corner accents */}
                            <div className="flipbook-cover-corner flipbook-cover-corner-tl" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-tr" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-bl" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-br" />

                            {/* Logo */}
                            <img src="assets/radius-logo2.webp" alt="Radius Architects & Associates" className="flipbook-cover-logo-front" />

                            {/* Divider line */}
                            <div className="flipbook-cover-divider flipbook-cover-divider-front-top" />

                            {/* Title */}
                            <h1 className="flipbook-cover-title">
                                Expert guidance and end-to-end solutions for hassle-free approvals and project success
                            </h1>

                            {/* Bottom decorative element */}
                            <div className="flipbook-cover-divider flipbook-cover-divider-front-bottom" />

                            {/* Swipe hint */}
                            <div className="flipbook-swipe-hint">
                                <span className="flipbook-swipe-hint-arrow">&#x276E;</span>
                                <span className="flipbook-swipe-hint-text">Swipe to open</span>
                            </div>
                        </div>
                    </PageCover>
                    <Page number={1} imageChildren={<img src="assets/flipbook/1a.webp" alt="Image 1a" className="page-image" />}></Page>
                    <Page number={2} imageChildren={<img src="assets/flipbook/1b.webp" alt="Image 1b" className="page-image" />}></Page>
                    <Page number={3} imageChildren={<img src="assets/flipbook/2a.webp" alt="Image 2a" className="page-image" />}></Page>
                    <Page number={4} imageChildren={<img src="assets/flipbook/2b.webp" alt="Image 2b" className="page-image" />}></Page>
                    <Page number={5} imageChildren={<img src="assets/flipbook/3a.webp" alt="Image 3a" className="page-image" />}></Page>
                    <Page number={6} imageChildren={<img src="assets/flipbook/3b.webp" alt="Image 3b" className="page-image" />}></Page>
                    <Page number={7} imageChildren={<img src="assets/flipbook/4a.webp" alt="Image 4a" className="page-image" />}></Page>
                    <Page number={8} imageChildren={<img src="assets/flipbook/4b.webp" alt="Image 4b" className="page-image" />}></Page>
                    <Page number={9} imageChildren={<img src="assets/flipbook/5a.webp" alt="Image 5a" className="page-image" />}></Page>
                    <Page number={10} imageChildren={<img src="assets/flipbook/5b.webp" alt="Image 5b" className="page-image" />}></Page>
                    <Page number={11} imageChildren={<img src="assets/flipbook/6a.webp" alt="Image 6a" className="page-image" />}></Page>
                    <Page number={12} imageChildren={<img src="assets/flipbook/6b.webp" alt="Image 6b" className="page-image" />}></Page>
                    <Page number={13} imageChildren={<img src="assets/flipbook/7a.webp" alt="Image 7a" className="page-image" />}></Page>
                    <Page number={14} imageChildren={<img src="assets/flipbook/7b.webp" alt="Image 7b" className="page-image" />}></Page>
                    <Page number={15} imageChildren={<img src="assets/flipbook/8a.webp" alt="Image 8a" className="page-image" />}></Page>
                    <Page number={16} imageChildren={<img src="assets/flipbook/8b.webp" alt="Image 8b" className="page-image" />}></Page>
                    <Page number={17} imageChildren={<img src="assets/flipbook/9a.webp" alt="Image 9a" className="page-image" />}></Page>
                    <Page number={18} imageChildren={<img src="assets/flipbook/9b.webp" alt="Image 9b" className="page-image" />}></Page>
                    <Page number={19} imageChildren={<img src="assets/flipbook/10a.webp" alt="Image 10a" className="page-image" />}></Page>
                    <Page number={20} imageChildren={<img src="assets/flipbook/10b.webp" alt="Image 10b" className="page-image" />}></Page>
                    <Page number={21} imageChildren={<img src="assets/flipbook/11a.webp" alt="Image 11a" className="page-image" />}></Page>
                    <Page number={22} imageChildren={<img src="assets/flipbook/11b.webp" alt="Image 11b" className="page-image" />}></Page>
                    <Page number={23} imageChildren={<img src="assets/flipbook/12a.webp" alt="Image 12a" className="page-image" />}></Page>
                    <Page number={24} imageChildren={<img src="assets/flipbook/12b.webp" alt="Image 12b" className="page-image" />}></Page>
                    <Page number={25} imageChildren={<img src="assets/flipbook/13a.webp" alt="Image 13a" className="page-image" />}></Page>
                    <Page number={26} imageChildren={<img src="assets/flipbook/13b.webp" alt="Image 13b" className="page-image" />}></Page>
                    <Page number={27} imageChildren={<img src="assets/flipbook/14a.webp" alt="Image 14a" className="page-image" />}></Page>
                    <Page number={28} imageChildren={<img src="assets/flipbook/14b.webp" alt="Image 14b" className="page-image" />}></Page>
                    <Page number={29} imageChildren={<img src="assets/flipbook/15a.webp" alt="Image 15a" className="page-image" />}></Page>
                    <Page number={30} imageChildren={<img src="assets/flipbook/15b.webp" alt="Image 15b" className="page-image" />}></Page>
                    <Page number={31} imageChildren={<img src="assets/flipbook/16a.webp" alt="Image 16a" className="page-image" />}></Page>
                    <Page number={32} imageChildren={<img src="assets/flipbook/16b.webp" alt="Image 16b" className="page-image" />}></Page>
                    <Page number={33} imageChildren={<img src="assets/flipbook/17a.webp" alt="Image 17a" className="page-image" />}></Page>
                    <Page number={34} imageChildren={<img src="assets/flipbook/17b.webp" alt="Image 17b" className="page-image" />}></Page>
                    <Page number={35} imageChildren={<img src="assets/flipbook/18a.webp" alt="Image 18a" className="page-image" />}></Page>
                    <Page number={36} imageChildren={<img src="assets/flipbook/18b.webp" alt="Image 18b" className="page-image" />}></Page>
                    <Page number={37} imageChildren={<img src="assets/flipbook/19a.webp" alt="Image 19a" className="page-image" />}></Page>
                    <Page number={38} imageChildren={<img src="assets/flipbook/19b.webp" alt="Image 19b" className="page-image" />}></Page>
                    <Page number={39} imageChildren={<img src="assets/flipbook/20a.webp" alt="Image 20a" className="page-image" />}></Page>
                    <Page number={40} imageChildren={<img src="assets/flipbook/20b.webp" alt="Image 20b" className="page-image" />}></Page>
                    <Page number={41} imageChildren={<img src="assets/flipbook/21a.webp" alt="Image 21a" className="page-image" />}></Page>
                    <Page number={42} imageChildren={<img src="assets/flipbook/21b.webp" alt="Image 21b" className="page-image" />}></Page>
                    <Page number={43} imageChildren={<img src="assets/flipbook/22a.webp" alt="Image 22a" className="page-image" />}></Page>
                    <Page number={44} imageChildren={<img src="assets/flipbook/22b.webp" alt="Image 22b" className="page-image" />}></Page>
                    <Page number={45} imageChildren={<img src="assets/flipbook/23a.webp" alt="Image 23a" className="page-image" />}></Page>
                    <Page number={46} imageChildren={<img src="assets/flipbook/23b.webp" alt="Image 23b" className="page-image" />}></Page>
                    <Page number={47} imageChildren={<img src="assets/flipbook/24a.webp" alt="Image 24a" className="page-image" />}></Page>
                    <Page number={48} imageChildren={<img src="assets/flipbook/24b.webp" alt="Image 24b" className="page-image" />}></Page>
                    <Page number={49} imageChildren={<img src="assets/flipbook/25a.webp" alt="Image 25a" className="page-image" />}></Page>
                    <Page number={50} imageChildren={<img src="assets/flipbook/25b.webp" alt="Image 25b" className="page-image" />}></Page>
                    <Page number={51} imageChildren={<img src="assets/flipbook/26a.webp" alt="Image 26a" className="page-image" />}></Page>
                    <Page number={52} imageChildren={<img src="assets/flipbook/26b.webp" alt="Image 26b" className="page-image" />}></Page>
                    <Page number={53} imageChildren={<img src="assets/flipbook/27a.webp" alt="Image 27a" className="page-image" />}></Page>
                    <Page number={54} imageChildren={<img src="assets/flipbook/27b.webp" alt="Image 27b" className="page-image" />}></Page>
                    <Page number={55} imageChildren={<img src="assets/flipbook/28a.webp" alt="Image 28a" className="page-image" />}></Page>
                    <Page number={56} imageChildren={<img src="assets/flipbook/28b.webp" alt="Image 28b" className="page-image" />}></Page>
                    <Page number={57} imageChildren={<img src="assets/flipbook/29a.webp" alt="Image 29a" className="page-image" />}></Page>
                    <Page number={58} imageChildren={<img src="assets/flipbook/29b.webp" alt="Image 29b" className="page-image" />}></Page>
                    <Page number={59} imageChildren={<img src="assets/flipbook/30a.webp" alt="Image 30a" className="page-image" />}></Page>
                    <Page number={60} imageChildren={<img src="assets/flipbook/30b.webp" alt="Image 30b" className="page-image" />}></Page>
                    <Page number={61} imageChildren={<img src="assets/flipbook/31a.webp" alt="Image 31a" className="page-image" />}></Page>
                    <Page number={62} imageChildren={<img src="assets/flipbook/31b.webp" alt="Image 31b" className="page-image" />}></Page>
                    <Page number={63} imageChildren={<img src="assets/flipbook/32a.webp" alt="Image 32a" className="page-image" />}></Page>
                    <Page number={64} imageChildren={<img src="assets/flipbook/32b.webp" alt="Image 32b" className="page-image" />}></Page>
                    <Page number={65} imageChildren={<img src="assets/flipbook/33a.webp" alt="Image 33a" className="page-image" />}></Page>
                    <Page number={66} imageChildren={<img src="assets/flipbook/33b.webp" alt="Image 33b" className="page-image" />}></Page>
                    <Page number={67} imageChildren={<img src="assets/flipbook/34a.webp" alt="Image 34a" className="page-image" />}></Page>
                    <Page number={68} imageChildren={<img src="assets/flipbook/34b.webp" alt="Image 34b" className="page-image" />}></Page>
                    <Page number={69} imageChildren={<img src="assets/flipbook/35a.webp" alt="Image 35a" className="page-image" />}></Page>
                    <Page number={70} imageChildren={<img src="assets/flipbook/35b.webp" alt="Image 35b" className="page-image" />}></Page>
                    <Page number={71} imageChildren={<img src="assets/flipbook/36a.webp" alt="Image 36a" className="page-image" />}></Page>
                    <Page number={72} imageChildren={<img src="assets/flipbook/36b.webp" alt="Image 36b" className="page-image" />}></Page>
                    <Page number={73} imageChildren={<img src="assets/flipbook/37a.webp" alt="Image 37a" className="page-image" />}></Page>
                    <Page number={74} imageChildren={<img src="assets/flipbook/37b.webp" alt="Image 37b" className="page-image" />}></Page>
                    <Page number={75} imageChildren={<img src="assets/flipbook/38a.webp" alt="Image 38a" className="page-image" />}></Page>
                    <Page number={76} imageChildren={<img src="assets/flipbook/38b.webp" alt="Image 38b" className="page-image" />}></Page>
                    <Page number={77} imageChildren={<img src="assets/flipbook/39a.webp" alt="Image 39a" className="page-image" />}></Page>
                    <Page number={78} imageChildren={<img src="assets/flipbook/39b.webp" alt="Image 39b" className="page-image" />}></Page>
                    <Page number={79} imageChildren={<img src="assets/flipbook/40a.webp" alt="Image 40a" className="page-image" />}></Page>
                    <Page number={80} imageChildren={<img src="assets/flipbook/40b.webp" alt="Image 40b" className="page-image" />}></Page>
                    <Page number={81} imageChildren={<img src="assets/flipbook/41a.webp" alt="Image 41a" className="page-image" />}></Page>
                    <Page number={82} imageChildren={<img src="assets/flipbook/41b.webp" alt="Image 41b" className="page-image" />}></Page>
                    <Page number={83} imageChildren={<img src="assets/flipbook/42a.webp" alt="Image 42a" className="page-image" />}></Page>
                    <Page number={84} imageChildren={<img src="assets/flipbook/42b.webp" alt="Image 42b" className="page-image" />}></Page>                    
                    <PageCover>
                        <div className="flipbook-cover-base flipbook-cover-back">
                            {/* Decorative border */}
                            <div className="flipbook-cover-border" />
                            {/* Corner accents */}
                            <div className="flipbook-cover-corner flipbook-cover-corner-tl" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-tr" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-bl" />
                            <div className="flipbook-cover-corner flipbook-cover-corner-br" />

                            {/* Logo */}
                            <img src="assets/radius-logo2.webp" alt="Radius Architects & Associates" className="flipbook-cover-logo-back" />

                            <div className="flipbook-cover-divider flipbook-cover-divider-back-top" />

                            <p className="flipbook-cover-subtitle">
                                Radius Architects &amp; Associates
                            </p>

                            <div className="flipbook-cover-divider flipbook-cover-divider-back-bottom" />
                        </div>
                    </PageCover>
                </HTMLFlipBook>
                
                {/* Fullscreen Button */}
                <div className={`fixed bottom-4 right-4 text-white bg-black bg-opacity-50 px-3 py-4 rounded-full z-50 flipbook-control ${controlsVisible ? 'flipbook-control-visible' : 'flipbook-control-hidden'}`}>
                    <button onClick={() => {
                        if (!document.fullscreenElement) {
                            document.documentElement.requestFullscreen();
                        } else {
                            document.exitFullscreen();
                        }
                    }} className="cursor-pointer px-2 py-0">
                        <span className="icon-fullscreen text-3xl!"></span>
                    </button>
                </div>
                
                {/* Navigation Buttons */}
                <div className={`fixed top-1/2 left-4 text-white bg-black bg-opacity-50 px-3 py-4 rounded-full z-50 transform -translate-y-1/2 flipbook-control ${controlsVisible ? 'flipbook-control-visible' : 'flipbook-control-hidden'}`}>
                    <button onClick={() => this.pageFlip.pageFlip().flipPrev()} className="cursor-pointer px-2 py-0">
                        <span className="icon-arrow-left text-3xl!"></span>
                    </button>
                </div>
                <div className={`fixed top-1/2 right-4 text-white bg-black bg-opacity-50 px-3 py-4 rounded-full z-50 transform -translate-y-1/2 flipbook-control ${controlsVisible ? 'flipbook-control-visible' : 'flipbook-control-hidden'}`}>
                    <button onClick={() => this.pageFlip.pageFlip().flipNext()} className="cursor-pointer px-2 py-0">
                        <span className="icon-arrow-right text-3xl!"></span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MyBook error:', error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><MyBook /></ErrorBoundary>);