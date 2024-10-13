import React from "react";

export default function PageChange(props) {
  return (
    <section className="fixed inset-0 bg-gray-900/30">
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
        <img className="m-auto text-3xl text-primary" src="/img/brand/higo.gif"></img>
      </div>
    </section>

  );
}
