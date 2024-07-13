import React from 'react';
import './catalog.css';
import placeholderImage from '../images/design1.PNG';

const catalogItems = [
    { id: 1, name: 'Indo-Chic Fusion T-Shirt', artist: 'Asha Singh', price: '₹3,500' },
    { id: 2, name: 'Modern Madhubani Hoodie', artist: 'Ravi Kumar', price: '₹4,900' },
    { id: 3, name: 'Pattachitra Contemporary Skirt', artist: 'Meera Patel', price: '₹4,500' },
    { id: 4, name: 'Warli Art Top', artist: 'Sunita Desai', price: '₹2,800' },
    { id: 5, name: 'Tanjore Traditional Jacket', artist: 'Lakshmi Iyer', price: '₹8,500' },
    { id: 6, name: 'Gond Heritage Shorts', artist: 'Amit Rathore', price: '₹6,300' },
    { id: 7, name: 'Phulkari Modern Blouse', artist: 'Kiran Bedi', price: '₹5,600' },
    { id: 8, name: 'Chikankari Elegance Dress', artist: 'Nisha Agarwal', price: '₹3,900' },
    { id: 9, name: 'Ajrakh Artistic Scarf', artist: 'Suresh Gupta', price: '₹3,200' },
    { id: 10, name: 'Bandhani Classic Pants', artist: 'Pooja Thakur', price: '₹7,800' },
    { id: 11, name: 'Kutch Embroidery Dress', artist: 'Manish Verma', price: '₹6,000' },
    { id: 12, name: 'Kasuti Heritage Blouse', artist: 'Shweta Rao', price: '₹4,200' },
];

const Catalog = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Catalogue</h1>
            <div className="row">
                {catalogItems.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card">
                            <img src={placeholderImage} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Artist: {item.artist}</p>
                                <p className="card-text">Price: {item.price}</p>
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
