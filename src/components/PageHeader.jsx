const PageHeader = ({ title, lead }) => (
  <div className="container text-center mb-5 page-header">
    <h1 className="display-6 fw-bold page-header-title">{title}</h1>
    {lead && <p className="text-muted fs-5 page-header-lead">{lead}</p>}
  </div>
);

export default PageHeader;
