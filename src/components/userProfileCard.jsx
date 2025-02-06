import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';

const UserProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1')
      .then(response => response.json())
      .then(data => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white shadow-xl rounded-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex justify-center items-center">
          <img
            src={user.picture.large}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute bottom-[-40px]"
          />
        </div>

        <CardContent className="px-6 pb-6 pt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{`${user.name.first} ${user.name.last}`}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-700">{`${user.location.city}, ${user.location.country}`}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-700">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-700">
                  {new Date(user.dob.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileCard;
