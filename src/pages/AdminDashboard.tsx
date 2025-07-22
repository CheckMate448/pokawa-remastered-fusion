import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Salad, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockSalads, mockIngredients } from '@/data/mockData';

const AdminDashboard = () => {
  const totalSalads = mockSalads.length;
  const availableSalads = mockSalads.filter(salad => salad.isAvailable).length;
  const totalIngredients = mockIngredients.length;
  const outOfStockIngredients = mockIngredients.filter(ingredient => !ingredient.inStock).length;

  const stats = [
    {
      title: 'Total Salads',
      value: totalSalads,
      description: `${availableSalads} available`,
      icon: Salad,
      color: 'text-emerald-600',
    },
    {
      title: 'Ingredients',
      value: totalIngredients,
      description: `${outOfStockIngredients} out of stock`,
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Low Stock Alert',
      value: outOfStockIngredients,
      description: 'Items need restocking',
      icon: AlertTriangle,
      color: 'text-orange-600',
    },
    {
      title: 'Revenue Today',
      value: '$342.50',
      description: '+12% from yesterday',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', salad: 'Caesar Salad', time: '2 minutes ago', status: 'completed' },
    { id: '2', customer: 'Jane Smith', salad: 'Mediterranean Salad', time: '5 minutes ago', status: 'preparing' },
    { id: '3', customer: 'Mike Johnson', salad: 'Protein Power Salad', time: '8 minutes ago', status: 'completed' },
    { id: '4', customer: 'Sarah Wilson', salad: 'Niçoise Salad', time: '12 minutes ago', status: 'delivered' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
          Live Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.salad}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        order.status === 'completed' ? 'default' :
                        order.status === 'preparing' ? 'secondary' : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Out of Stock Items</CardTitle>
            <CardDescription>Ingredients that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockIngredients
                .filter(ingredient => !ingredient.inStock)
                .map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">{ingredient.category}</p>
                    </div>
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                ))}
              {mockIngredients.filter(ingredient => !ingredient.inStock).length === 0 && (
                <p className="text-muted-foreground text-center py-4">All ingredients are in stock!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;