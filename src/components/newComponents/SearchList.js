import React from "react";
import { Form, List } from "semantic-ui-react";

const SearchList = ({
  data,
  onSearch,
  onSelect,
  searchPlaceholder = "Search...",
  extractLabel,
  extractOwner,
  extractUpdatedAt,
  reversed = true,
  sortOptions = [],
  defaultSortKey = null,
  buttonContainerStyle = {},
}) => {
  const [query, setQuery] = React.useState("");

  const [sortKey, setSortKey] = React.useState(defaultSortKey || (sortOptions[0]?.key || null));
  const [sortAsc, setSortAsc] = React.useState(true);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    onSearch(value);
  };

  const defaultExtractOwner = (item) => {
    if (!item.owner || !Array.isArray(item.employees)) return "";
    const owner = item.employees.find((emp) =>
      emp.id === item.owner ||
      emp.id === Number(item.owner) ||
      emp.id === item.owner?.id
    );
    return owner ? `${owner.first_name} ${owner.last_name}` : "Unknown";
  };

  const defaultExtractUpdatedAt = (item) => item.updated_at || null;

  const ownerExtractor = extractOwner || defaultExtractOwner;
  const updatedAtExtractor = extractUpdatedAt || defaultExtractUpdatedAt;

  const sortData = (items) => {
    if (!sortKey) return items;

    const getSortValue = (item) => {
      if (sortKey === 'creator') return ownerExtractor(item).toLowerCase();
      if (sortKey === 'updated_at') return updatedAtExtractor(item);
      return item[sortKey];
    };

    const sorted = [...items].sort((a, b) => {
      const aVal = getSortValue(a);
      const bVal = getSortValue(b);

      if (!aVal || !bVal) return 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      const aDate = new Date(aVal);
      const bDate = new Date(bVal);
      return aDate - bDate;
    });

    return sortAsc ? sorted : sorted.reverse();
  };

  const displayData = sortData(reversed ? [...data].reverse() : [...data]);

  return (
    <>
      
      {sortOptions.length > 0 && (
        <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <strong style={{ marginRight: "0.5rem" }}>Sort By:</strong>
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <Form.Group inline style={{ display: "flex", flexWrap: "nowrap" }}>
              {sortOptions.map((opt) => (
                <Form.Button
                  key={opt.key}
                  toggle
                  active={sortKey === opt.key}
                  size="mini"
                  onClick={() => {
                    if (sortKey === opt.key) {
                      setSortAsc(!sortAsc);
                    } else {
                      setSortKey(opt.key);
                      setSortAsc(true);
                    }
                  }}
                >
                  {opt.label} {sortKey === opt.key ? (sortAsc ? "↑" : "↓") : ""}
                </Form.Button>
              ))}
            </Form.Group>
          </div>
        </div>
      )}<Form>
        <Form.Input
          placeholder={searchPlaceholder}
          onChange={handleChange}
          value={query}
        />
      </Form>
      <div style={{ maxHeight: "450px", overflowY: "auto" }}>
        <List divided selection>
          {displayData.map((item) => (
            <List.Item key={item.id} onClick={() => onSelect(item)}>
              <List.Content>
                <List.Header>{extractLabel(item)}</List.Header>
                {item.email ? (
                  <>
                    <List.Description>Email: {item.email}</List.Description>
                    {item.role && <List.Description>Role: {item.role}</List.Description>}
                  </>
                ) : (
                  <List.Description>
                    Created by: {ownerExtractor(item)}
                  </List.Description>
                )}
                {!item.email && (
                  <List.Description>
                    Last Updated:{" "}
                    {updatedAtExtractor(item)
                      ? new Date(updatedAtExtractor(item)).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </List.Description>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};

export default SearchList;
