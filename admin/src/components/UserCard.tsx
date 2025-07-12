import { format } from 'date-fns';
import Counter from './Counter';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { cn } from '@/lib/utils';

const UserCard = ({
    avatar,
    email,
    fullName,
    role,
    status,
    createdAt,
}: UserType) => {
    return (
        <>
            <div className="flex items-center justify-between mb-4 text-gray-700">
                <div className="flex items-center space-x-4">
                    <Avatar style={{ width: 50, height: 50 }}>
                        <AvatarImage src={avatar} alt="avatar" />
                        <AvatarFallback className="bg-gray-100 font-bold">
                            {fullName?.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium">{fullName}</h3>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-3 text-gray-800">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Member Since</span>
                    <span>
                        {format(
                            new Date(createdAt || Date.now()),
                            'dd MMM yyyy'
                        )}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Orders</span>
                    <span>18</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Spent</span>
                    <b>
                        $<Counter target={1856} />
                    </b>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span
                        className={cn(
                            status === 'active'
                                ? 'status-active'
                                : 'status-inactive',
                            '!uppercase'
                        )}>
                        {status}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Role</span>
                    <span className="status-pending !uppercase">{role}</span>
                </div>
            </div>
        </>
    );
};

export default UserCard;
