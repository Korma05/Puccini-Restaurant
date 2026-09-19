import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const PHONE = '+441912321961';
const DISPLAY_PHONE = '+44 191 232 1961';
const ADDRESS = '29 Pudding Chare, Newcastle upon Tyne, NE1 1UF, United Kingdom';
const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Puccini%20Restaurant%2C%2029%20Pudding%20Chare%2C%20Newcastle%20upon%20Tyne%20NE1%201UF';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=100057132443573';

const photos = [
  { src: '/src/assets/puccini-02.jpg', title: 'Signature pizza', tag: 'Pizza' },
  { src: '/src/assets/puccini-20.jpg', title: 'Restaurant entrance', tag: 'Restaurant' },
  { src: '/src/assets/puccini-06.jpg', title: 'Seafood selection', tag: 'Seafood' },
  { src: '/src/assets/puccini-12.jpg', title: 'Fresh pasta', tag: 'Pasta' },
  { src: '/src/assets/puccini-04.jpg', title: 'Italian dining', tag: 'Dining' },
  { src: '/src/assets/puccini-07.jpg', title: 'Warm interior', tag: 'Interior' },
  { src: '/src/assets/puccini-09.jpg', title: 'Grill dish', tag: 'Grill' },
  { src: '/src/assets/puccini-03.jpg', title: 'Seafood & sides', tag: 'Seafood' },
  { src: '/src/assets/puccini-05.jpg', title: 'Pizza & pasta', tag: 'Italian' },
  { src: '/src/assets/puccini-08.jpg', title: 'Dining room', tag: 'Interior' },
  { src: '/src/assets/puccini-10.jpg', title: 'Antipasti', tag: 'Starters' },
  { src: '/src/assets/puccini-14.jpg', title: 'Restaurant atmosphere', tag: 'Atmosphere' },
];

const menu = {
  Starters: [
    ['Garlic Bread Spicy', 'Spicy jalapeño, cheese & herbs', '£6'],
    ['Garlic Bread', '', '£4'],
    ['Garlic Bread Tomato', '', '£5'],
    ['Garlic Bread Cheese', '', '£6'],
    ['King Prawns', '4 king prawns. Garlic & white wine sauce or spicy tomato sauce with chilli.', '£11'],
    ['Potato Skins', 'With garlic & chilli dip', '£4'],
    ['Potato Skins Herb', 'With garlic & chilli dip', '£4.50'],
    ['Garlic Mushrooms', 'Garlic & parsley sauce served with toasted bread', '£5'],
    ['Soup of the Day', 'Please ask for today’s soup', '£4'],
    ['Hummus with Pitta Bread', '', '£4.50'],
    ['Deep Fried Squid', 'Served with Cajun spiced garlic mayo', '£7'],
    ['Prawn Cocktail', '', '£8'],
    ['Chicken Liver Pate', 'Red onion marmalade & fresh toasted bread', '£6'],
    ['Mussels', 'Spicy tomato sauce & fresh herbs or cream & white wine sauce, fresh garlic and herbs', '£8.50'],
    ['Marinated Wings', 'Garlic & lemon / sticky / very hot', '£8'],
  ],
  Pizza: [
    ['Margherita', 'Cheese & tomato', '£7.50'],
    ['Pepperoni', 'Pepperoni', '£8.95'],
    ['Diavola', 'Pepperoni, fresh jalapeño peppers, onions & chilli', '£8.95'],
    ['Boschetto', 'Bolognese sauce & garlic', '£8.95'],
    ['Vegetarian', 'Onion, mushroom, peppers', '£8.95'],
    ['Arrabiata V', 'Onions, garlic, chilli, fresh herbs, cherry tomatoes & cream sauce', '£9.95'],
    ['Carbonara', 'Bacon, cream, egg, parsley & parmesan', '£9.95'],
    ['Amatriciana', 'Bacon, onions & tomato sauce with chilli, garlic, fresh herbs & cherry tomatoes', '£9.95'],
    ['Pasta Vegi V', 'Mixed vegetables, peppers, mushrooms, tomato & onions', '£9.95'],
    ['Bolognese', 'Minced beef, tomato, herbs & red wine', '£9.95'],
    ['Napoli V', 'Onions, garlic & tomato', '£9.95'],
    ['Lasagna', '', '£10.95'],
    ['Altonno', 'Tuna & garlic', '£8.95'],
    ['Meatfeast', 'Ham, chicken, pepperoni, chorizo', '£11'],
    ['Kiev', 'Chicken breast, parsley & garlic', '£11'],
    ['Beef', 'Beef strips & blue cheese with fresh basil', '£11'],
  ],
  Pasta: [
    ['Arrabiata V', 'Onions, garlic, chilli, fresh herbs, cherry tomatoes & cream sauce', '£9.95'],
    ['Carbonara', 'Bacon, cream, egg, parsley & parmesan', '£9.95'],
    ['Amatriciana', 'Bacon, onions & tomato sauce with chilli, garlic, fresh herbs & cherry tomatoes', '£9.95'],
    ['Pasta Vegi V', 'Mixed vegetables, peppers, mushrooms, tomato & onions', '£9.95'],
    ['Bolognese', 'Minced beef, tomato, herbs & red wine', '£9.95'],
    ['Napoli V', 'Onions, garlic & tomato', '£9.95'],
    ['Lasagna', '', '£10.95'],
    ['Pasta Romana*', 'Chicken, red onions, mushrooms, cream, fresh herbs in a tomato sauce', '£11'],
    ['Pasta Alfredo*', 'Chicken, mushroom, onion, white wine, fresh herbs, cream, béchamel & parmesan cheese', '£11'],
    ['Fillet Steak Strips*', 'Red onion, peppers, sweet chilli & fresh herbs', '£12'],
    ['Cajun Steak Fillet Strips*', 'Onion, peppers, touch of chilli & cream base', '£12'],
    ['Maramantti*', 'Spicy sausage, tiger prawns, fresh chilli, fresh herbs & garlic in light tomato & lobster bisque sauce', '£11'],
    ['Di Mare*', 'Fresh seafood mussels in shell, fresh water prawns, squid, garlic with a herb Napoli lobster bisque sauce', '£11'],
  ],
  Risotto: [
    ['Spicy Fillet Beef Risotto', 'Steak strips, red onion, mushrooms, peppers, chilli and napoli sauce', '£13'],
    ['Risotto Mare', 'Fresh seafood mussels in shell, fresh water prawns, squid, garlic with a herb cream lobster bisque sauce', '£14'],
    ['Vegetable Risotto', 'Mediterranean roast vegetables, mushroom, peppers, onion & Napoli sauce', '£11'],
    ['Pollo Risotto', 'Rice, chicken, mushroom, onion, peppers, mixed herbs, cream & tomato sauce', '£11'],
    ['Spicy Mixed Meat Risotto', 'Steak strips, chicken, mushroom, onions, peppers, mixed herbs & cream', '£13'],
  ],
  Meat: [
    ['Chicken Breast on Bone', '', '£12.50'],
    ['Breadcrumbed Breast', '', '£11.50'],
    ['Breaded Chicken Wrap', '', '£10.50'],
    ['Spicy Beef Wrap', '', '£11'],
    ['Spicy Mixed Meat Wrap', '', '£12'],
    ['Fillet Steak', '', '£21.50'],
    ['Sirloin Steak', '', '£21.50'],
    ['Ribeye Steak', '', '£21.50'],
    ['Meat on Bone', 'On request', '—'],
    ['Beef Burger', 'Cheese, tomato, lettuce', '£12'],
    ['Breaded Chicken Burger', 'Bacon, cheese, tomato, lettuce', '£11'],
    ['Chicken Skewers', 'Served with pita bread, salad, skinny fries and garlic mayonnaise', '£17.95'],
  ],
  Kids: [
    ['Kids Beef Burger', 'Cheese', '£5'],
    ['Kids Hot Dog', '', '£5'],
    ['Kids Chicken Nuggets', '', '£4'],
    ['Kids Pasta', '', '£5'],
    ['Kids Pizza', '', '£5'],
  ],
  Sides: [
    ['Chunky Chips', '', '£3'],
    ['Curly Fries', '', '£3'],
    ['Cheesy Chips', '', '£4'],
    ['Piri Piri Chips', '', '£4'],
    ['Skinny Fries', '', '£3'],
    ['Salad', '', '£3'],
    ['Feta Salad', '', '£4.50'],
    ['Home Made Chips', '', '£4'],
  ],
};

function Icon({ name }) {
  const paths = {
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    x: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    external: <><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
    facebook: <><path d="M15 8h3V4h-3c-3.3 0-5 1.8-5 5v3H7v4h3v6h4v-6h3.3l.7-4H14V9c0-.7.3-1 1-1Z"/></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [openNav, setOpenNav] = useState(false);
  const [menuCategory, setMenuCategory] = useState('Pizza');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const closeNav = () => setOpenNav(false);

  return (
    <>
      <header className="site-header">
        <a href="#home" className="brand" onClick={closeNav} aria-label="Puccini Restaurant home">
          <span className="brand-mark">P</span>
          <span><strong>PUCCINI</strong><small>PIZZERIA & STEAKHOUSE</small></span>
        </a>
        <nav className={openNav ? 'nav open' : 'nav'} aria-label="Main navigation">
          {['Home','About','Menu','Gallery','Services','Location','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeNav}>{item}</a>
          ))}
          <a className="nav-cta" href="#menu" onClick={closeNav}>View Menu <Icon name="arrow" /></a>
        </nav>
        <button className="menu-toggle" aria-label={openNav ? 'Close navigation' : 'Open navigation'} aria-expanded={openNav} onClick={() => setOpenNav(v => !v)}>
          <Icon name={openNav ? 'x' : 'menu'} />
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <div className="eyebrow"><span /> Newcastle upon Tyne <span /></div>
            <h1>Italian food,<br /><em>made to linger over.</em></h1>
            <p>Traditional pizza, pasta, seafood and grill dishes in the heart of Newcastle upon Tyne.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#menu">Explore the menu <Icon name="arrow" /></a>
              <a className="btn btn-ghost" href={`tel:${PHONE}`}>Call Puccini <Icon name="phone" /></a>
            </div>
            <div className="hero-note"><span className="status-dot" /> Currently open · closes 10:00 PM</div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span /> Scroll</a>
        </section>

        <section className="intro-strip">
          <div className="container intro-grid">
            <div><span className="strip-kicker">Puccini Restaurant</span><strong>Informal Italian dining, <em>right in the city.</em></strong></div>
            <p>From classic pizza and pasta to seafood and grill dishes, the menu brings familiar Italian favourites together in a relaxed Newcastle setting.</p>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-collage">
              <img className="about-main" src="/src/assets/puccini-20.jpg" alt="Puccini Restaurant entrance on Pudding Chare" loading="lazy" />
              <img className="about-small" src="/src/assets/puccini-07.jpg" alt="Warmly lit Puccini dining room" loading="lazy" />
              <div className="stamp"><span>Est.</span><strong>PUCCINI</strong><small>NEWCASTLE</small></div>
            </div>
            <div className="about-copy">
              <p className="section-label">The restaurant</p>
              <h2>A little taste of <em>Italy</em> in the heart of Newcastle.</h2>
              <p>Puccini is an informal Italian restaurant serving traditional pizza and pasta, alongside seafood and grill dishes. Whether you are joining us for a relaxed meal or picking up something to enjoy elsewhere, the menu is built around approachable Italian favourites.</p>
              <div className="signature-rule"><span>PUCCINI</span></div>
              <div className="facts"><div><b>01</b><span>Traditional<br />Italian dishes</span></div><div><b>02</b><span>Pizza, pasta,<br />seafood & grill</span></div><div><b>03</b><span>Dine-in,<br />takeaway & delivery</span></div></div>
            </div>
          </div>
        </section>

        <section id="menu" className="section menu-section">
          <div className="container">
            <div className="section-heading centered"><p className="section-label">From the kitchen</p><h2>The Puccini <em>menu</em></h2><p>Browse the current menu below. All dishes are served as described on the restaurant menu; please check with staff regarding allergens.</p></div>
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {Object.keys(menu).map(cat => <button key={cat} className={menuCategory === cat ? 'active' : ''} onClick={() => setMenuCategory(cat)} role="tab" aria-selected={menuCategory === cat}>{cat}</button>)}
            </div>
            <div className="menu-panel">
              <div className="menu-panel-head"><span>{menuCategory}</span><small>{menuCategory === 'Pizza' ? 'All pizzas based on mozzarella cheese, tomato sauce & oregano' : menuCategory === 'Pasta' ? 'Choice of spaghetti, penne or tagliatelle' : 'Selected from the current printed menu'}</small></div>
              <div className="menu-list">
                {menu[menuCategory].map(([name, desc, price]) => <article className="dish" key={`${menuCategory}-${name}`}><div className="dish-main"><h3>{name}</h3>{desc && <p>{desc}</p>}</div><span className="dish-line" /><strong>{price}</strong></article>)}
              </div>
              <div className="menu-notes"><span>Gluten-free pasta +£1</span><span>Gluten-free pizza base +£2</span><span>Allergens: please check with staff before ordering</span></div>
            </div>
            <div className="menu-download"><a href="/Puccini-Food-Menu.pdf" target="_blank" rel="noreferrer">View the full printed menu <Icon name="external" /></a></div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading"><p className="section-label">Ways to enjoy Puccini</p><h2>However you dine, <em>come hungry.</em></h2></div>
            <div className="services-grid">
              <article><span className="service-number">01</span><h3>Dine in</h3><p>Settle into the restaurant and enjoy pizza, pasta, seafood and grill dishes in a warm, relaxed setting.</p><a href="#location">Find us <Icon name="arrow" /></a></article>
              <article><span className="service-number">02</span><h3>Takeaway</h3><p>Enjoy your Puccini favourites away from the restaurant. Call the team for current takeaway information.</p><a href={`tel:${PHONE}`}>Call us <Icon name="phone" /></a></article>
              <article><span className="service-number">03</span><h3>Delivery</h3><p>Delivery is available. Contact Puccini directly for current delivery information and availability.</p><a href={`tel:${PHONE}`}>Call us <Icon name="phone" /></a></article>
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-heading centered"><p className="section-label">A glimpse inside</p><h2>Food, atmosphere & <em>the Puccini table.</em></h2></div>
            <div className="gallery-grid">
              {photos.map((p, i) => <button className={`gallery-item gallery-${i + 1}`} key={p.src} onClick={() => setLightbox(p)} aria-label={`Open ${p.title}`}><img src={p.src} alt={p.title} loading="lazy" /><span><small>{p.tag}</small>{p.title}</span></button>)}
            </div>
          </div>
        </section>

        <section className="offer-band">
          <div className="container offer-grid">
            <div><p className="section-label">From the current menu</p><h2>Three courses.<br /><em>£9.</em></h2></div>
            <div><p><strong>Daily Lunch Special</strong><br />Served Tue–Fri, 12:00–6:00pm. Starter, any pasta or pizza, and dessert.</p><small>See the full menu for exclusions and details.</small></div>
            <a className="btn btn-light" href="#menu">See menu <Icon name="arrow" /></a>
          </div>
        </section>

        <section id="location" className="section location-section">
          <div className="container location-grid">
            <div className="map-card"><div className="map-art"><div className="map-road r1"/><div className="map-road r2"/><div className="map-road r3"/><div className="map-block b1"/><div className="map-block b2"/><div className="map-block b3"/><div className="map-pin"><Icon name="pin" /></div></div><a className="map-link" href={DIRECTIONS} target="_blank" rel="noreferrer">Open in Google Maps <Icon name="external" /></a></div>
            <div className="location-copy"><p className="section-label">Find Puccini</p><h2>Right in the heart of <em>Newcastle.</em></h2><p className="address">29 Pudding Chare<br />Newcastle upon Tyne<br />NE1 1UF<br />United Kingdom</p><div className="contact-row"><div><Icon name="phone" /><span>Call us<strong><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a></strong></span></div><div><Icon name="clock" /><span>Current status<strong>Open · closes 10:00 PM</strong></span></div></div><div className="location-actions"><a className="btn btn-dark" href={DIRECTIONS} target="_blank" rel="noreferrer">Get directions <Icon name="arrow" /></a><a className="btn btn-outline" href={`tel:${PHONE}`}>Call Puccini <Icon name="phone" /></a></div><p className="plus-code">Plus Code <strong>X9CP+98 Newcastle upon Tyne</strong></p></div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-inner"><div><p className="section-label">Come and see us</p><h2>Make it a <em>Puccini</em> evening.</h2></div><div className="contact-actions"><a className="btn btn-primary" href={`tel:${PHONE}`}>Call {DISPLAY_PHONE} <Icon name="phone" /></a><a className="social" href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Puccini on Facebook"><Icon name="facebook" /></a></div></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><div className="brand"><span className="brand-mark">P</span><span><strong>PUCCINI</strong><small>PIZZERIA & STEAKHOUSE</small></span></div><p>Traditional Italian pizza, pasta, seafood and grill dishes in Newcastle upon Tyne.</p></div><div><h3>Explore</h3><a href="#about">About</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a><a href="#services">Services</a></div><div><h3>Visit</h3><a href="#location">29 Pudding Chare</a><a href="#location">Newcastle upon Tyne</a><a href="#location">NE1 1UF</a><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a></div><div><h3>Menu</h3><a href="/Puccini-Food-Menu.pdf" target="_blank" rel="noreferrer">View full menu</a><a href="#services">Dine-in</a><a href="#services">Takeaway</a><a href="#services">Delivery</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Puccini Restaurant. All rights reserved.</span><span>Newcastle upon Tyne · NE1</span></div></footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><Icon name="x" /></button><img src={lightbox.src} alt={lightbox.title} onClick={e => e.stopPropagation()} /><div className="lightbox-caption"><small>{lightbox.tag}</small>{lightbox.title}</div></div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
