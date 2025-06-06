import { useForm } from "react-hook-form";

const EditProfile = ({ user, onClose, onProfileUpdated }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: user });

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-profile/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Perfil actualizado correctamente");
                if (typeof onProfileUpdated === 'function') onProfileUpdated();
                else if (onClose) onClose();
            } else {
                alert(result.msg || "No se pudo actualizar el perfil");
            }
        } catch (error) {
            alert("Error de conexión al actualizar el perfil");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mb-3">
                <label className="form-label mb-1 small">Name</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <small className="text-danger">El nombre es obligatorio</small>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label mb-1 small">Email</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <small className="text-danger">El email es obligatorio</small>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label mb-1 small">Direccion</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("address", { required: false })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label mb-1 small">Telefono</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("phone", { required: false })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label mb-1 small">Ciudad</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("city", { required: false })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label mb-1 small">Pais</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("country", { required: false })}
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
            </div>
        </form>
    );
};

export default EditProfile;
