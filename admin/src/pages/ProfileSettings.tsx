import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { RootState } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { Input } from '@/components/ui';
import { axiosInstance, errorHandler } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [email, setEmail] = useState(user?.email || '');
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [fullNameAndEmailLoading, setFullNameAndEmailLoading] =
        useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleFullNameAndEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!email || !fullName) return;
            setFullNameAndEmailLoading(true);
            const response = await axiosInstance.patch('/user/update', {
                email,
                fullName,
            });
            if (response.data) {
                if (user && user._id) {
                    dispatch(login({ ...user, email, fullName }));
                }
                toast.success('user update success');
            }
        } catch (error) {
            errorHandler(error as AxiosError);
        } finally {
            setFullNameAndEmailLoading(false);
        }
    };

    const logoutHandler = async () => {
        try {
            const res = await axiosInstance.post('/user/logout');
            if (res.data) {
                localStorage.removeItem('accessToken');
                dispatch(logout());
            }
        } catch (error) {
            errorHandler(error as AxiosError);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || oldPassword !== newPassword) return;
        setPasswordLoading(true);
        try {
            const response = await axiosInstance.post('/user/password', {
                oldPassword,
                newPassword,
            });
            if (response.data) toast.success('password update');
        } catch (error) {
            errorHandler(error as AxiosError);
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleUploadAvatar = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAvatarLoading(true);
        try {
            if (e.target.files && e.target.files[0]) {
                const formData = new FormData();
                formData.append('avatar', e.target.files[0]);
                const res = await axiosInstance.post('/user/avatar', formData);
                if (res.data) {
                    toast.success('upload avatar');
                    if (user && user._id) {
                        dispatch(login({ ...user, avatar: res.data.avatar }));
                    }
                    setAvatar(res.data.avatar);
                }
            }
        } catch (error) {
            errorHandler(error as AxiosError);
        } finally {
            setAvatarLoading(false);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-4 mx-auto max-w-screen-md text-slate-700">
            {/* Profile Avatar */}
            <div className="card">
                <h2 className="text-lg font-bold pb-4">Profile Avatar</h2>
                <div className="flex items-center gap-4">
                    <Avatar style={{ width: 100, height: 100 }}>
                        <AvatarImage src={avatar} alt="avatar" />
                        <AvatarFallback>
                            {user?.fullName.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>

                    <label
                        htmlFor="upload-avatar"
                        className="btn-primary min-w-[160px] bg-slate-100 cursor-pointer text-center py-2">
                        {avatarLoading ? 'Uploading...' : 'Upload Avatar'}
                    </label>
                    <Input
                        onChange={handleUploadAvatar}
                        type="file"
                        id="upload-avatar"
                        className="hidden"
                    />
                </div>
            </div>

            {/* FullName and Email Change */}
            <form
                className="grid gap-4 flex-1 card"
                onSubmit={handleFullNameAndEmailSubmit}>
                <h2 className="text-lg font-bold pt-4 pb-2">
                    User Information
                </h2>
                <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    name="full Name"
                    required
                />
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                />
                <button
                    className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
                    disabled={
                        fullNameAndEmailLoading ||
                        (user?.email === email && user?.fullName === fullName)
                    }>
                    {fullNameAndEmailLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>

            {/* Password change */}

            <form
                onSubmit={handlePasswordSubmit}
                className="space-y-3 card flex flex-col">
                <h2 className="text-lg font-bold pt-4 pb-2">Password Change</h2>
                <Input
                    name="old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                    name="new Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
                    type="submit"
                    disabled={passwordLoading || newPassword.length < 5}>
                    {passwordLoading ? 'Saving...' : 'Save Change'}
                </button>
            </form>

            <button
                className="btn text-red-600 font-bold"
                onClick={logoutHandler}>
                Logout
            </button>
        </div>
    );
};

export default ProfileSettings;
