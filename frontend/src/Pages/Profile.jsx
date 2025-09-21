import { useEffect, useState } from "react";

// Mock Service class to resolve the import error and make the component runnable.
// In a real application, this would be in a separate file.
class Service {
    async get(endpoint) {
        if (endpoint === 'user/me') {
            // Simulate an API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Return mock data
            return {
                name: 'Varsha Reddy',
                email: 'puchalasrivarsha2004@gmail.com',
                createdAt: '2025-09-10T04:49:40.918Z',
            };
        }
        return null;
    }
}

const Profile = () => {

    const [data, setData] = useState(null);

    // Use the mocked Service class
    const service = new Service();

    const getData = async () => {
        const response = await service.get('user/me');
        console.log(response);
        setData(response);
    }

    useEffect(() => {
        getData();
    }, []);

    // Function to format the date for better readability
    const formatDate = (dateString) => {
        if (!dateString) return 'Loading...';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#333',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            background: "linear-gradient(to top, #bd81c3ff 0%, #e2e9f0ff 100%)",
            padding: '2rem'
        }}>
            <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '2rem 3rem',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <img
                    src="penguin.webp"
                    alt="Profile"
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        marginBottom: "1.5rem",
                        border: '5px solid #ea66aaff',
                        objectFit: 'cover'
                    }}
                />
                <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#c566eaff' }}>
                    {data ? data.name : 'Loading...'}
                </h1>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', color: '#777' }}>
                    {data ? data.email : 'Loading...'}
                </p>
                <div style={{
                    borderTop: '1px solid #eee',
                    paddingTop: '1rem',
                    fontSize: '0.9rem',
                    color: '#555'
                }}>
                    Member since: {formatDate(data?.createdAt)}
                </div>
            </div>
        </div>
    )
}

export default Profile;