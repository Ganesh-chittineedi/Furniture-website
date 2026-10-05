// Reliable Image Fallback Helper
const fallbackImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

// Ganesh Furniture Product Catalog (In INR ₹)
const products = [
    {
        id: 1,
        title: 'Ganesh Royal Teak 3-Seater Sofa',
        category: 'sofas',
        price: 24999,
        oldPrice: 31000,
        rating: 4.9,
        reviews: 38,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        description: 'Solid teak wood 3-seater living room sofa with high-density premium fabric cushions.',
        tag: 'Bestseller'
    },
    {
        id: 2,
        title: 'Teak Wood 6-Seater Dining Table Set',
        category: 'tables',
        price: 34999,
        oldPrice: 42000,
        rating: 4.8,
        reviews: 29,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
        description: 'Elegant 6-seater solid wood dining table set for family dining in Palakollu homes.',
        tag: 'Popular'
    },
    {
        id: 3,
        title: 'Ergonomic Wooden Armchair',
        category: 'chairs',
        price: 6499,
        oldPrice: 8500,
        rating: 4.7,
        reviews: 22,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
        description: 'Handcrafted solid wood accent armchair with cushioned seating for living rooms or offices.',
        tag: 'Featured'
    },
    {
        id: 4,
        title: 'King Size Teak Wood Bed Frame',
        category: 'beds',
        price: 38999,
        oldPrice: 48000,
        rating: 4.9,
        reviews: 51,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        description: 'Premium handcrafted Teakwood king size bed with solid headboard support.',
        tag: 'Luxury'
    },
    {
        id: 5,
        title: 'Sheesham Center Coffee Table',
        category: 'tables',
        price: 8999,
        oldPrice: 11500,
        rating: 4.8,
        reviews: 18,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
        description: 'Durable wooden coffee table with natural polish and bottom storage shelf.',
        tag: 'Value Deal'
    },
    {
        id: 6,
        title: 'Comfort Soft Cushion 2-Seater Couch',
        category: 'sofas',
        price: 18500,
        oldPrice: 23000,
        rating: 4.6,
        reviews: 15,
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
        description: 'Compact 2-seater sofa ideal for smaller living rooms and office waiting areas.',
        tag: 'Hot Item'
    },
    {
        id: 7,
        title: 'Teak Wooden Rocking Chair',
        category: 'chairs',
        price: 9499,
        oldPrice: 12000,
        rating: 4.9,
        reviews: 44,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional solid teakwood rocking armchair designed for relaxation and comfort.',
        tag: 'Top Choice'
    },
    {
        id: 8,
        title: 'Queen Size Wooden Bed with Storage',
        category: 'beds',
        price: 32999,
        oldPrice: 40000,
        rating: 4.8,
        reviews: 33,
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
        description: 'Solid queen size bed featuring under-bed pullout storage drawers.',
        tag: 'Trending'
    }
];

// Global Application State
let cart = [];
let currentCategory = 'all';

// Format Currency into Indian Rupee (₹)
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Initialize Page
window.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
});

// Render Product Grid
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    const noProductsMsg = document.getElementById('noProductsMsg');
    grid.innerHTML = '';

    if (items.length === 0) {
        noProductsMsg.classList.remove('hidden');
        return;
    } else {
        noProductsMsg.classList.add('hidden');
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-2xl overflow-hidden border border-borderSand shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between';

        card.innerHTML = `
            <div class="relative overflow-hidden bg-warmBg">
                <span class="absolute top-3 left-3 z-10 bg-woodDark text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">${product.tag}</span>
                <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null; this.src='${fallbackImage}'" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">

                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button onclick="openQuickView(${product.id})" class="bg-white text-woodDark hover:bg-brandAmber hover:text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-1.5">
                        <i class="fa-solid fa-eye text-xs"></i> Quick View
                    </button>
                </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <span class="text-[10px] font-bold text-brandAmber uppercase tracking-wider">${product.category}</span>
                    <h3 class="font-bold text-woodDark text-base hover:text-brandAmber transition-colors line-clamp-1 mt-0.5">${product.title}</h3>

                    <div class="flex items-center space-x-1 mt-1 text-amber-400 text-xs">
                        ${getStarRating(product.rating)}
                        <span class="text-textMuted text-[11px] ml-1 font-medium">(${product.reviews})</span>
                    </div>
                </div>

                <div class="pt-3 border-t border-borderSand flex items-center justify-between">
                    <div>
                        <span class="text-lg font-extrabold text-woodDark">${formatINR(product.price)}</span>
                        <span class="text-xs line-through text-textMuted ml-1 font-normal">${formatINR(product.oldPrice)}</span>
                    </div>
                    <button onclick="addToCart(${product.id})" class="p-2.5 rounded-xl bg-woodTeak hover:bg-brandAmber text-white shadow-md hover:shadow-lg transition-all active:scale-95" title="Add to Bag">
                        <i class="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star text-textMuted/40"></i>';
        }
    }
    return stars;
}

function filterCategory(cat) {
    currentCategory = cat;
    const buttons = document.querySelectorAll('#categoryFilters button');
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(cat) || (cat === 'all' && btn.innerText.includes('All'))) {
            btn.className = 'cat-btn active px-5 py-2 rounded-full text-xs font-bold border transition-all duration-200 bg-woodDark text-white border-woodDark shadow-sm';
        } else {
            btn.className = 'cat-btn px-5 py-2 rounded-full text-xs font-bold border border-borderSand bg-warmBg text-textMain hover:border-brandAmber transition-all duration-200';
        }
    });

    applyFiltersAndSort();
}

function handleSearch() {
    applyFiltersAndSort();
}

function handleSort() {
    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const sortVal = document.getElementById('sortSelect').value;
    let filtered = [...products];

    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (query) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    if (sortVal === 'lowToHigh') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'highToLow') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`Added "${product.title}" to bag!`);
}

function updateCartQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
    showToast('Item removed from bag.');
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartBadge');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');

    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    badge.innerText = totalCount;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-textMuted space-y-3">
                <i class="fa-solid fa-bag-shopping text-4xl text-borderSand"></i>
                <p class="text-sm font-semibold">Your shopping bag is empty</p>
                <button onclick="toggleCartDrawer()" class="px-4 py-2 bg-amber-100 text-woodDark rounded-lg text-xs font-bold hover:bg-brandAmber hover:text-white transition-colors">Explore Furniture</button>
            </div>
        `;
        subtotalEl.innerText = formatINR(0);
        totalEl.innerText = formatINR(0);
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-center space-x-3 p-3 bg-warmBg rounded-xl border border-borderSand';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src='${fallbackImage}'" class="w-14 h-14 object-cover rounded-lg bg-white">
            <div class="flex-1 min-w-0">
                <h4 class="text-xs font-bold text-woodDark truncate">${item.title}</h4>
                <p class="text-xs font-extrabold text-brandAmber mt-0.5">${formatINR(item.price * item.quantity)}</p>
                <div class="flex items-center space-x-2 mt-1">
                    <button onclick="updateCartQuantity(${item.id}, -1)" class="w-5 h-5 rounded bg-white border border-borderSand text-xs flex items-center justify-center font-bold text-woodDark hover:bg-borderSand">-</button>
                    <span class="text-xs font-bold px-1">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" class="w-5 h-5 rounded bg-white border border-borderSand text-xs flex items-center justify-center font-bold text-woodDark hover:bg-borderSand">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-textMuted hover:text-red-500 p-1">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        `;
        container.appendChild(itemEl);
    });

    subtotalEl.innerText = formatINR(subtotal);
    totalEl.innerText = formatINR(subtotal);
}

function openQuickView(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    document.getElementById('modalImage').src = p.image;
    document.getElementById('modalCategory').innerText = p.category;
    document.getElementById('modalTitle').innerText = p.title;
    document.getElementById('modalStars').innerHTML = getStarRating(p.rating);
    document.getElementById('modalRating').innerText = `${p.rating} (${p.reviews} reviews)`;
    document.getElementById('modalPrice').innerText = formatINR(p.price);
    document.getElementById('modalOldPrice').innerText = formatINR(p.oldPrice);
    document.getElementById('modalDescription').innerText = p.description;

    const addBtn = document.getElementById('modalAddToCartBtn');
    addBtn.onclick = () => {
        addToCart(p.id);
        closeQuickView();
    };

    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.remove('scale-95');
    modal.firstElementChild.classList.add('scale-100');
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.remove('scale-100');
    modal.firstElementChild.classList.add('scale-95');
}

function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');

    if (drawer.classList.contains('translate-x-full')) {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.className = 'fa-solid fa-xmark text-xl';
    } else {
        menu.classList.add('hidden');
        icon.className = 'fa-solid fa-bars text-xl';
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    msg.innerText = message;

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');

    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 3000);
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your shopping bag is empty!');
        return;
    }

    let message = "Hello Ganesh Furniture (Palakollu), I want to place an order:\n\n";
    cart.forEach(item => {
        message += `• ${item.title} (x${item.quantity}) - ${formatINR(item.price * item.quantity)}\n`;
    });
    const grandTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    message += `\nTotal Amount: ${formatINR(grandTotal)}\nLocation: Palakollu, West Godavari, Andhra Pradesh\nEmail: ganeshchittineedi@gmail.com`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/919381548456?text=${encodedMsg}`, '_blank');
}

function handleInquirySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('inquiryName').value;
    const phone = document.getElementById('inquiryPhone').value;
    const msg = document.getElementById('inquiryMsg').value;

    const whatsappMessage = `Hello Ganesh Furniture (Palakollu),\n\nName: ${name}\nPhone: ${phone}\nInquiry: ${msg}\nEmail Contact: ganeshchittineedi@gmail.com`;
    window.open(`https://wa.me/919381548456?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    showToast('Inquiry forwarded to WhatsApp!');
}
