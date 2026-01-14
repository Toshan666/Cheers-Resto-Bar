import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Locations } from '@/entities';

interface FooterProps {
  location: Locations | null;
  onCallNow: () => void;
  onGetDirections: () => void;
  onWhatsApp: () => void;
}

export default function Footer({ location, onCallNow, onGetDirections, onWhatsApp }: FooterProps) {
  return (
    <footer className="w-full bg-foreground text-primary-foreground py-16">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                <p className="font-paragraph text-sm leading-relaxed">
                  {location?.fullAddress || 'G16, RG 1 Complex, Opposite Balaji Mandir, Prashant Vihar, Sector 14, Rohini, New Delhi – 110085'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <p className="font-paragraph text-sm">
                  {location?.phoneNumber || '097189 99702'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <p className="font-paragraph text-sm">
                  Open daily, closes at 11:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={onCallNow}
                className="font-paragraph w-full px-6 py-3 border-2 border-accent-gold text-accent-gold bg-transparent rounded-lg hover:bg-accent-gold hover:text-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button
                onClick={onGetDirections}
                className="font-paragraph w-full px-6 py-3 border-2 border-primary-foreground text-primary-foreground bg-transparent rounded-lg hover:bg-primary-foreground hover:text-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </button>
              {location?.whatsappNumber && (
                <button
                  onClick={onWhatsApp}
                  className="font-paragraph w-full px-6 py-3 border-2 border-primary-foreground text-primary-foreground bg-transparent rounded-lg hover:bg-primary-foreground hover:text-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-2xl mb-6">Find Us</h3>
            <div className="h-[200px] rounded-lg overflow-hidden">
              {location?.googleMapsEmbedUrl ? (
                <iframe
                  src={location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cheers Resto Bar Location"
                ></iframe>
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <p className="font-paragraph text-sm text-primary-foreground">Map loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary text-center">
          <p className="font-paragraph text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} Cheers Resto Bar. All rights reserved. | Women-owned business proudly serving Rohini, New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}
