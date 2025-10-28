import { MdDeleteOutline, MdOutlineEditCalendar } from "react-icons/md";
import AppSubmitButton from "../component/form/AppSubmitButton";
import CustomFormik from "../component/form/CustomFormik";
import { addActivityValues } from "../utility/initialValues";
import { validateAddActivity } from "../utility/validations";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import useFetch from "../api/useFetch";
import sender from "../api/sender";
import AppTextAreaField from "../component/form/AppTextAreaField";

export const CreateToDoList = () => {
  const initialValues = addActivityValues();
  const validationSchema = validateAddActivity();
  const [response, setresponse] = useState();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const { data } = useFetch("posts");

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const handleSubmit = async (values) => {
    let apiResponse;
    if (editingItem) {
      // Update existing item
      apiResponse = await sender(
        `http://localhost:3000/posts/${editingItem.id}`,
        "PUT",
        values
      );
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...apiResponse } : item
        )
      );
      setEditingItem(null);
    } else {
      // Create new item
      apiResponse = await sender("http://localhost:3000/posts", "POST", values);
      if (apiResponse && apiResponse.id) {
        setItems((prev) => [apiResponse, ...prev]);
      }
    }
    setresponse(apiResponse);
    window.location.reload();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Cancel button that resets the Formik form and exits edit mode
  const CancelButton = () => {
    const { resetForm } = useFormikContext();
    const onCancel = () => {
      resetForm();
      setEditingItem(null);
    };

    return (
      <button
        type="button"
        onClick={onCancel}
        className="w-fit px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
      >
        Cancel
      </button>
    );
  };

  // Handling delete
  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Delete this item?");
    if (!confirmDelete) return;

    try {
      const apiResponse = await sender(
        `http://localhost:3000/posts/${id}`,
        "DELETE"
      );
      // if sender returns success, remove from local list
      setItems((prev) => prev.filter((it) => it.id !== id));
      setresponse(apiResponse);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <div className="max-w-[700px] h-[500px] p-2 bg-[#] mx-auto my-auto text-white rounded-md mt-10">
        <CustomFormik
          onSubmit={handleSubmit}
          initialValues={editingItem || initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <h1 className="text-center text-2xl mb-10 p-3 bg-[#374a60]">
            PLAN YOUR DAY
          </h1>

          <div className="w-full flex items-start mt-5">
            <AppTextAreaField
              name="activity"
              placeholder="What's your plan today"
              defaultValue={editingItem?.activity || ""}
              className="w-4/5"
            />
            <div className="w-1/5 flex flex-col items-center gap-2 pt-1">
              <AppSubmitButton title={editingItem ? "Update" : "Create"}  />
              {editingItem && <CancelButton />}
            </div>
          </div>
        </CustomFormik>

        <div className="mt-5 flex flex-col gap-4">
          {items &&
            items?.map((item) => (
              <div
                key={item.id}
                className="w-full flex justify-between items-center py-3 px-2 bg-gray-800 rounded-md"
              >
                <p>{item?.activity}</p>
                <div className="flex gap-2">
                  <MdDeleteOutline
                    className="text-gray-400 cursor-pointer hover:text-gray-50 hover:scale-120"
                    onClick={() => handleDelete(item.id)}
                  />
                  <MdOutlineEditCalendar
                    className="text-gray-400 cursor-pointer hover:text-gray-50 hover:scale-120"
                    onClick={() => handleEdit(item)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
