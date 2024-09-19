export const removeFromWishlistAction = (itemId) => {
    return {
      type: 'REMOVE_FROM_WISHLIST',
      payload: itemId,
    };
  };
  