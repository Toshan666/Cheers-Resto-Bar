/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: locations
 * Interface for Locations
 */
export interface Locations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  whatsappNumber?: string;
  /** @wixFieldType time */
  openingTime?: any;
  /** @wixFieldType time */
  closingTime?: any;
  /** @wixFieldType url */
  googleMapsEmbedUrl?: string;
  /** @wixFieldType url */
  getDirectionsUrl?: string;
}


/**
 * Collection ID: menuitems
 * Interface for MenuItems
 */
export interface MenuItems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType text */
  cuisineType?: string;
  /** @wixFieldType text */
  dietaryClassification?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType boolean */
  isPopular?: boolean;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
}


/**
 * Collection ID: restaurantfeatures
 * Interface for RestaurantFeatures
 */
export interface RestaurantFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  featureDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isHighlighted?: boolean;
}
