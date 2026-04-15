import useUser from "@/features/auth/hooks/useUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCamera, FiMail, FiSave, FiUser } from "react-icons/fi";
import Loader from "./Loader";

function Profile({ extraFields = [], profileHook }) {
  const { user, isFetchingUser } = useUser();

  const { profile, isFetchingProfile } = profileHook(user?.id);

  const fullName = user?.fullName;
  const email = user?.email;
  const avatarUrl = user?.avatar;

  const extraDefaultValues = extraFields.reduce((acc, field) => {
    acc[field.name] = profile?.[field.name] || "";
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      fullName: fullName || "",
      email: email || "",
      ...extraDefaultValues,
    },
  });

  const { updateUser, isUpdating } = useUpdateUser();

  const [avatar, setAvatar] = useState(null);

  const displayAvatar = avatar || avatarUrl || "/default_avatar.png";

  const fileRef = useRef();
  function handleAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // preview
      setValue("avatar", file); // form
    }
  }

  function onSubmit(data) {
    const extraFieldsData = extraFields.reduce((acc, field) => {
      acc[field.name] = data[field.name];
      return acc;
    }, {});

    updateUser({
      ...data,
      fullName,
      avatar: data.avatar,
      extraFields: extraFieldsData,
      userId: user.id,
      role: user.role,
    });
  }

  const inputClass =
    "w-full bg-surface-2 border border-border rounded-[8px] px-4 py-2.5 text-text text-sm placeholder:text-text-faint focus:outline-none focus:border-primary/50 transition-colors";

  const labelClass = "block text-text-muted text-xs font-medium mb-1.5";

  if (isFetchingUser || isUpdating || isFetchingProfile) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-surface border-border flex flex-col gap-5 rounded-[12px] border p-6'>
        {/* Personal Information */}
        <h3 className='text-text text-base font-semibold'>
          Personal Information
        </h3>

        {/* Avatar */}
        <div className='flex items-center gap-4'>
          <div
            onClick={() => fileRef.current.click()}
            className='bg-primary/20 group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full'
          >
            {displayAvatar ? (
              <img
                src={displayAvatar}
                className='h-full w-full rounded-full object-cover'
              />
            ) : (
              <span className='text-primary text-xl font-bold'>
                {(fullName || email || "??").slice(0, 2).toUpperCase()}
              </span>
            )}
            <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
              <FiCamera className='text-white' size={18} />
            </div>
          </div>
          <input
            ref={fileRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleAvatar}
          />
          <div>
            <p className='text-text font-semibold'>{fullName}</p>
            <p className='text-text-muted mt-0.5 text-xs'>
              {extraFields
                .map((f) => profile?.[f.name])
                .filter(Boolean)
                .join(" · ")}
            </p>
            <button
              type='button'
              onClick={() => fileRef.current.click()}
              className='text-primary mt-1 cursor-pointer text-xs hover:underline'
            >
              Change photo
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className='flex flex-col gap-4'>
          <div>
            <label className={labelClass}>Display Name</label>
            <div className='relative'>
              <FiUser
                size={14}
                className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
              />
              <input
                {...register("fullName", {
                  required: "fullName is required",
                })}
                className={`${inputClass} pl-9`}
              />
            </div>
            {errors.fullName && (
              <p className='text-danger mt-1 ml-2 flex items-center gap-1 text-xs font-medium'>
                <span>⚠</span> {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contact Email</label>
            <div className='relative'>
              <FiMail
                size={14}
                className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
              />
              <input
                readOnly={true}
                {...register("email")}
                className={`${inputClass} pl-9 opacity-50`}
              />
            </div>
            {errors.email && (
              <p className='text-danger mt-1 ml-2 flex items-center gap-1 text-xs font-medium'>
                <span>⚠</span> {errors.email.message}
              </p>
            )}
          </div>

          {extraFields?.map((field) => (
            <div key={field.name}>
              <label className={labelClass}>{field.label}</label>
              <select
                {...register(field.name, {
                  required: `${field.label} is required`,
                })}
                className={inputClass}
              >
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {errors[field.name] && (
                <p className='text-danger mt-1 ml-2 flex items-center gap-1 text-xs font-medium'>
                  <span>⚠</span> {errors[field.name].message}
                </p>
              )}
            </div>
          ))}

          <button className='bg-primary hover:bg-primary/80 mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] py-2.5 text-sm font-medium text-white transition-colors'>
            <FiSave size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default Profile;
