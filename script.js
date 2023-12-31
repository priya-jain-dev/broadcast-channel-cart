let cartCount = 0;
const addToCartBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const cartBadge = document.getElementById("cart-count");
const box = document.getElementById("box");
const channel = new BroadcastChannel("app-broadcast-channel");

const updateCartDisplay = () => {
  cartBadge.innerHTML = cartCount;
};

const handleBoxAnimation = (animationClass) => {
  box.classList.add(animationClass);
  setTimeout(() => {
    box.classList.remove(animationClass);
  }, 1000);
};

const sendMessage = (action, count) => {
  const message = { action, count };
  channel.postMessage(message);
};

addToCartBtn.addEventListener("click", () => {
  handleBoxAnimation("add-box");
  cartCount++;
  sendMessage("add", cartCount);
  setTimeout(updateCartDisplay, 500);
});

removeBtn.addEventListener("click", () => {
  if (cartCount > 0) {
    handleBoxAnimation("remove-box");
    cartCount--;
    sendMessage("remove", cartCount);
    setTimeout(updateCartDisplay, 500);
  }
});

channel.onmessage = (event) => {
  console.log(`Received message: ${event.data}`);
  if (event.data.action === "add" || event.data.action === "remove") {
    event.data.action === "add" && handleBoxAnimation("add-box");
    event.data.action === "remove" && handleBoxAnimation("remove-box");
    cartCount = event.data.count;
    setTimeout(updateCartDisplay, 500);
  }
};
