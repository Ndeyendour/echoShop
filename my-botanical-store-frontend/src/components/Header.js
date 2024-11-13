import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../pages/CartContext';
import { FavoritesContext } from '../pages/FavoritesContext';
import { useUser } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Menu() {
    const { cart, updateQuantityInCart, removeFromCart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);
    const { favorites } = useContext(FavoritesContext);
    const { user } = useUser();
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const [selectedLanguage, setSelectedLanguage] = useState('EN');
  
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleImageClick = (product) => {
        updateQuantityInCart(product._id, product.quantity + 1);
    };

    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <Fragment>
            <header id="header" className="position-relative">
                <div className="headerHolderCol pt-lg-4 pb-lg-5 py-3">
                    <div className="container">
                        <div className="row text-center text-md-left">
                            <div className="col-12 col-md-4 mb-2 mb-md-0">
                                <a href="tel:+221772977043" className="tel d-flex align-items-center justify-content-center justify-content-md-start" style={{ textDecoration: 'none' }}>
                                    <i className="icon-call mr-2"></i> +221772977043
                                </a>
                            </div>
                            <div className="col-12 col-md-4 mb-2 mb-md-0 text-center">
                                <a href="mailto:mybotanic@gmail.com" className="tel d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                    <i className="icon icon-email mr-2"></i> mybotanic@gmail.com
                                </a>
                            </div>
                            <div className="col-12 col-md-4 text-center text-md-right">
                                
                                <address  className="m-0">Rufisque,Dakar,Senegal</address>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="headerHolder container pt-lg-5 pb-lg-7 py-4">
                    <div className="row align-items-center">
                        <div className="col-6 col-sm-4 col-lg-2">
                            <div className="logo">
                                <Link to="/"><img src="images/logo.png" alt="Botanical" className="img-fluid" /></Link>
                            </div>
                        </div>
                        <div className="col-12 col-sm-8 col-lg-8 order-lg-2">
                            <nav className="navbar navbar-expand-lg navbar-light p-0 pageNav2">
                                {/* Mise à jour du bouton hamburger pour Bootstrap 5 */}
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav mx-auto text-uppercase menu-list">
                                        <li className="nav-item"><Link className="nav-link" to="/">ACCUEIL</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/product">PRODUITS</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/cart">PANIER</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="col-6 col-lg-2 order-lg-3 text-right">
                            <ul className="nav wishListII d-flex justify-content-end">
                                <li className="nav-item">
                                    <Link to="/favoris" className="icon-heart d-block position-relative"style={{ textDecoration: 'none' }}>
                                        <span className="num rounded">{favorites.length > 0 ? favorites.length : 0}</span>
                                    </Link>
                                </li>
                                <li className="nav-item ml-2">
                                    <a className="icon-cart d-block position-relative"style={{ textDecoration: 'none' }} href="javascript:void(0);" onClick={toggleCart}>
                                        <span className="num rounded">{cart.length}</span>
                                    </a>
                                    {showCart && (
                                        <div className="cart-dropdown">
                                            {cart.length > 0 ? (
                                                <div>
                                                    <ul className="cart-items-list">
                                                        {cart.map((product, index) => (
                                                            <li key={index} className="cart-item d-flex">
                                                                <img 
                                                                    src={product.imageUrl} 
                                                                    alt={product.name} 
                                                                    className="cart-item-image" 
                                                                    onClick={() => handleImageClick(product)}
                                                                />
                                                                <div className="cart-item-details">
                                                                    <p className="cart-item-name">{product.name}</p>
                                                                    <p className="cart-item-quantity">Qty: {product.quantity}</p>
                                                                    <p className="cart-item-price">€{product.price}</p>
                                                                </div>
                                                                <button 
                                                                    className="remove-item-btn" 
                                                                    onClick={() => removeFromCart(product._id)}
                                                                >
                                                                    ×
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <p className="cart-total">Total: €{totalPrice.toFixed(2)}</p>
                                                    <Link to="/cart" className="view-cart-btn">VIEW CART</Link>
                                                    <button className="checkout-btn" onClick={goToCheckout}>CHECKOUT</button>
                                                </div>
                                            ) : (
                                                <p>Your cart is empty</p>
                                            )}
                                        </div>
                                    )}
                                </li>
                                <li className="nav-item ml-2">
                                    {user ? (
                                        <div className="icon-profile">
                                            <span>{user.username}</span>
                                        </div>
                                    ) : (
                                        <Link to="/login" className="icon-profile">
                                            <i className="icon-class-name" />
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
}

export default Menu;