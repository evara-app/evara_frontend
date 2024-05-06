import React from "react";

function Note({ data, handler, validation, submit }) {
  return (
    <form onSubmit={submit} className="flex flex-col gap-y-2">
      <label htmlFor="note" className="flex items-center justify-between">
        Write your note
      </label>
      <textarea
        id="note"
        rows="10"
        value={validation.values.note || ""}
        className={`w-full rounded border mb-2 border-white-two p-2 outline-none ${
          validation.errors.note
            ? "focus:border-red-500"
            : "focus:border-green-blue"
        }`}
        onChange={(e) => handler("note", e.target.value)}
      ></textarea>
      <div>
        <button type="submit" className="button px-10">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Note;
