import { NgModule } from '@angular/core';
import { 
  LucideAngularModule,ShieldCheck, Lock, Timer,
  MapPin, Clock, Users, Anchor, ChevronLeft, ChevronRight, Compass, Ship,
  Target, Eye, Heart, Sparkles, Shield, Lightbulb, Star, User, 
  DollarSign, Award, HeadphonesIcon, Phone, Mail, Menu, Car, BookOpen, CircleEllipsis, Moon, Sun, House,
  Cloud, MessageCircle, ChevronDown, Ellipsis, ArrowLeft, ArrowRight,
  Check, Search, Circle, X, Dot, PanelLeft, Calendar, ListFilter, Waves, 
  Mountain, CircleAlert, Globe, Leaf, Handshake, GraduationCap, 
  CircleCheck, TrendingUp, Plane, Hotel, ChevronUp, GripVertical,Info, Baby, Flag, CheckLine,
  TriangleAlert,Bookmark,Droplets,
  LogOut, Bell, FileText, PanelLeftOpen, LayoutGrid, Settings, ShoppingBag, CirclePlus,ExternalLink,
  Map, Activity, FileDigit, 
  RefreshCw, Pencil, Trash, RotateCcw
} from 'lucide-angular';

const icons = {
  MapPin, Clock, Users, Anchor, ChevronLeft, ChevronRight, Compass, Ship,ShieldCheck,Lock,Timer,
  Target, Eye, Heart, Sparkles, Shield, Lightbulb, Star, User, 
  DollarSign, Award, HeadphonesIcon, Phone, Mail, Menu, Car, BookOpen, CircleEllipsis, Moon, Sun, House,
  Cloud, MessageCircle, ChevronDown, Ellipsis, ArrowLeft, ArrowRight,
  Check, Search, Circle, X, Dot, PanelLeft, Calendar, ListFilter, Waves, 
  Mountain, CircleAlert, Globe, Leaf, Handshake, GraduationCap, 
  CircleCheck, TrendingUp, Plane, Hotel, ChevronUp, GripVertical,Info,  Baby, Flag, CheckLine,        
  TriangleAlert,Bookmark, Droplets,
  LogOut, Bell, FileText, PanelLeftOpen, LayoutGrid, Settings, ShoppingBag, CirclePlus, ExternalLink,
  Map, Activity, FileDigit,
  RefreshCw, Pencil, Trash, RotateCcw
};

@NgModule({
  imports: [LucideAngularModule.pick(icons)],
  exports: [LucideAngularModule]
})
export class IconsModule { }