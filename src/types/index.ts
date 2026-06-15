export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  orgName: string;
  tier: number;
  balance: string;
  bank: string;
  bvn: string;
  accountNumber: string;
  avatar: string;
}