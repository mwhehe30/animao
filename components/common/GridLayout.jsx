const GridLayout = ({ children, title }) => {
  return (
    <div>
      <div className="text-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black via-indigo-400 to-black bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default GridLayout;
