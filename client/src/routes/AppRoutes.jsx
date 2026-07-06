import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';
import Home from '../pages/Home';
import SearchResults from '../pages/SearchResults';
import MovieDetails from '../pages/MovieDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Watchlist from '../pages/Watchlist';
import MyReviews from '../pages/MyReviews';
import UserProfile from '../pages/UserProfile';
import Recommendations from '../pages/Recommendations';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies/:tmdbId" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
