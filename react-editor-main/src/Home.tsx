import React, { useState, useRef, CSSProperties } from 'react';
import useEditorType from '~/hooks/useEditorType';
import useDesignEditorContext from '~/hooks/useDesignEditorContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const editorType = useEditorType();
    const { displayPreview, setDisplayPreview } = useDesignEditorContext();
    const navigate = useNavigate();

    const [selectedSector, setSelectedSector] = useState<keyof typeof templates | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const sectors = ['HealthTech', 'FinTech', 'EdTech', 'E-commerce', 'AI/ML'];

    const templates = {
        HealthTech: ['Health Template 1', 'Health Template 2', 'Health Template 3'],
        FinTech: ['Finance Template 1', 'Finance Template 2', 'Finance Template 3'],
        EdTech: ['Education Template 1', 'Education Template 2', 'Education Template 3'],
        'E-commerce': ['E-commerce Template 1', 'E-commerce Template 2', 'E-commerce Template 3'],
        'AI/ML': ['AI Template 1', 'AI Template 2', 'AI Template 3'],
    };

    const navigateToApp = () => {
        navigate('/editor'); // Redirect to the /editor route
    };

    const handleSectorClick = (sector: string) => {
        setSelectedSector(sector as keyof typeof templates);
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div style={styles.container}>
                {/* Greeting Section */}


                {/* Main Section */}
                <main style={styles.main}>
                    {/* Design Today Section with Background */}

                    <section style={styles.designTodaySection}>
                        <div style={styles.greetingSection}>
                            <div style={styles.greetingContainer}>
                                <h1 style={styles.greetingText}>
                                    Hello! I am Zephyr{' '}
                                    <img src="/src/styles/images/zephyr.png" alt="Zephyr" style={styles.gifInline} />, <br />
                                    Your personal investment banker!
                                </h1>
                            </div>
                        </div>

                        <h1 style={styles.heading}>
                            What will you <span style={styles.underline}>design</span> today?
                        </h1>
                        <input
                            type="search"
                            style={styles.searchInput}
                            placeholder="Try creating your pitch deck!"
                        />

                        {/* Sectors Section */}
                        <section style={styles.sectorsSection}>
                            {sectors.map((sector) => (
                                <div
                                    key={sector}
                                    style={{
                                        ...styles.sector,
                                        backgroundColor: selectedSector === sector ? '#7d2ae8' : '#fff',
                                        color: selectedSector === sector ? '#fff' : '#000',
                                    }}
                                    onClick={() => handleSectorClick(sector)}
                                >
                                    {sector}
                                </div>
                            ))}
                        </section>
                    </section>

                    {/* Recommended Templates Section with Horizontal Scroll */}
                    <section style={styles.templatesSection}>
                        <div style={styles.templatesContainer}>
                            <h2 style={styles.subheading}>
                                {selectedSector ? `Recommended Templates for ${selectedSector}` : 'Recommended Templates for Your Startup'}
                            </h2>
                            <div style={styles.scrollWrapper}>
                                <button style={styles.arrowButton} onClick={scrollLeft}>&lt;</button>
                                <div style={styles.scrollArea} ref={scrollContainerRef}>
                                    {(selectedSector ? templates[selectedSector] : Object.values(templates).flat()).map(
                                        (template) => (
                                            <div
                                                key={template}
                                                style={styles.template}
                                                onClick={() => navigateToApp()} // Navigate to /editor on click
                                            >
                                                <img
                                                    src={`images/${template.toLowerCase().replace(/ /g, '-')}.jpg`}
                                                    alt={template}
                                                    style={styles.templateImage}
                                                />
                                                <p style={styles.templateName}>{template}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                                <button style={styles.arrowButton} onClick={scrollRight}>&gt;</button>
                            </div>
                        </div>
                    </section>

                    {/* All Templates Section */}
                    <section style={styles.allTemplatesSection}>
                        <h2 style={styles.subheading}>All Templates</h2>
                        <div style={styles.gridAllTemplates}>
                            {Object.values(templates)
                                .flat()
                                .map((template) => (
                                    <div
                                        key={template}
                                        style={styles.template}
                                        onClick={() => navigateToApp()} // Navigate to /editor on click
                                    >
                                        <img
                                            src={`images/${template.toLowerCase().replace(/ /g, '-')}.jpg`}
                                            alt={template}
                                            style={styles.templateImage}
                                        />
                                        <p style={styles.templateName}>{template}</p>
                                    </div>
                                ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

// CSS styles with TypeScript support
const styles: Record<string, CSSProperties> = {
    container: {
        width: '100vw',
        overflowX: 'hidden',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
    },
    greetingSection: {
        padding: '16px',
        backgroundColor: '',
        textAlign: 'center' as CSSProperties['textAlign'],
        borderBottom: '',
    },
    greetingText: {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '16px 0',
        color: '#fff',
    },
    gifContainer: {
        marginTop: '16px',
    },
    gif: {
        width: '100px',
        height: 'auto',
    },
    main: {
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
    },
    designTodaySection: {
        background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)',
        padding: '32px 16px',
        textAlign: 'center' as CSSProperties['textAlign'],
        color: '#fff',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    underline: {
        textDecoration: 'underline',
    },
    searchInput: {
        width: '50%',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #ddd',
        color: '#333',
    },
    sectorsSection: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '24px',
    },
    sector: {
        padding: '8px 16px',
        borderRadius: '9999px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    templatesSection: {
        textAlign: 'center' as CSSProperties['textAlign'],
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#f7fafc',
    },
    templatesContainer: {
        display: 'inline-block',
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '90vw',
    },
    subheading: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#333',
    },
    scrollWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    arrowButton: {
        backgroundColor: '#e2e8f0',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        padding: '8px',
        margin: '0 8px',
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    },
    scrollArea: {
        display: 'flex',
        overflowX: 'auto',
        padding: '16px 0',
        gap: '16px',
        scrollbarWidth: 'thin',
    },
    gridAllTemplates: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
    },
    template: {
        flex: '0 0 auto',
        width: '200px',
        backgroundColor: '#f0f0f0',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        textAlign: 'center' as CSSProperties['textAlign'],
        boxSizing: 'border-box',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    templateImage: {
        marginBottom: '8px',
        width: '100%',
        height: 'auto',
    },
    templateName: {
        fontSize: '0.875rem',
        color: '#333',
    },
    allTemplatesSection: {
        textAlign: 'center' as CSSProperties['textAlign'],
        marginBottom: '32px',
        padding: '24px',
    },
    gifInline: {
        width: '30px', // Adjust the size as needed
        height: 'auto',
        marginLeft: '0px',
        marginBottom: '5px',
        verticalAlign: 'middle', // Aligns the image vertically with the text
    }
};

// Add hover animation styles for templates
const templateHoverEffect = {
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
};

export default Home;
