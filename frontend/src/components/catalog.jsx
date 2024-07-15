import React from 'react';
import './catalog.css';
import output from '../images/output.png';
import output2 from '../images/output 2.png';
import output3 from '../images/output 3.png';
import output4 from '../images/output 4.png';
import output5 from '../images/output 5.png';
import output6 from '../images/output 6.png';

const catalogItems = [
    { id: 1, name: 'Modern Madhubani Hoodie ', artist: 'Asha Singh', price: '₹3,500', image: output },
    { id: 2, name: 'Pattachitra Contemporary Skirt', artist: 'Ravi Kumar', price: '₹4,900', image: output2 },
    { id: 3, name: 'Indo-Chic Fusion T-Shirt', artist: 'Meera Patel', price: '₹4,500', image: output3 },
    { id: 4, name: 'Tanjore Traditional Jacket', artist: 'Sunita Desai', price: '₹2,800', image: output4 },
    { id: 5, name: 'Warli Art Top', artist: 'Lakshmi Iyer', price: '₹8,500', image: output5 },
    { id: 6, name: 'Gond Heritage Shorts', artist: 'Amit Rathore', price: '₹6,300', image: output6 },
    { id: 7, name: 'Phulkari Modern Blouse', artist: 'Kiran Bedi', price: '₹5,600', image: output },
    { id: 8, name: 'Chikankari Elegance Dress', artist: 'Nisha Agarwal', price: '₹3,900', image: output2 },
    { id: 9, name: 'Ajrakh Artistic Scarf', artist: 'Suresh Gupta', price: '₹3,200', image: output3 },
    { id: 10, name: 'Bandhani Classic Pants', artist: 'Pooja Thakur', price: '₹7,800', image: output4 },
    { id: 11, name: 'Kutch Embroidery Dress', artist: 'Manish Verma', price: '₹6,000', image: output5 },
    { id: 12, name: 'Kasuti Heritage Blouse', artist: 'Shweta Rao', price: '₹4,200', image: output6 },
];

const Catalog = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Catalogue</h1>
            <div className="row">
                {catalogItems.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card">
                            <img src={item.image} className="card-img-top" alt={item.name} />
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
