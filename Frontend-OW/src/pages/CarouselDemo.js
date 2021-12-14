import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import ProductService from '../service/ProductService';
import Navigation from '../components/navigation';
import { TabMenu } from 'primereact/tabmenu';
import './CarouselDemo.css';

const CarouselDemo = ({user}) => {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Documentation', icon: 'pi pi-fw pi-file' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data.slice(0, 9)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const productTemplate = (product) => {
        console.log(product)
        return (
            <>
 
                <div className="product-item">
                    <div className="product-item-content">
                        <div className="p-mb-3">
                            <img src={`../data/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                        </div>
                        <div>
                            <h4 className="p-mb-1">{product.name}</h4>
                            <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                            <div className="car-buttons p-mt-5">
                                <Button icon="pi pi-check" className="p-button p-button-rounded p-mr-2" />
                                <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
                                <Button icon="pi pi-times" className="p-button-danger p-button-rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navigation user={user}/>
            <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Daily Suggestion</h2>
        
        </div>
     
      </div>
    </div>
            <div className="carousel-demo" >


                <div className="card">
                    <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3000} itemTemplate={productTemplate} header={<h5></h5>} />
                </div>


            </div>
        </>
    );
}
export default CarouselDemo;
