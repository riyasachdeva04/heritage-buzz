import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';  // Make sure this points to your Firebase config file

const Catalog = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchCatalogItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "catalogue"));
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCatalogItems(items);
            } catch (error) {
                console.error('Error fetching catalogue items:', error);
            }
        };

        fetchCatalogItems();
    }, [db]);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Catalogue</h1>
            <div className="row">
                {catalogItems.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card">
                            <img src={item.url} className="card-img-top" alt="Catalog Item" />
                            <div className="card-body">
                                <h5 className="card-title">Design</h5>
                                <p className="card-text">Artform: {item.artform}</p>
                                <p className="card-text">Date: {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</p>
                                <a href="/" className="btn btn-primary">Buy Now</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
