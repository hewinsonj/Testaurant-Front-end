import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Table, Loader, Message, Button, Icon } from 'semantic-ui-react';
import { getEditLogs } from '../../api/editLog';

/**
 * EditLogModal
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - user (object with token)
 *  - itemType (required): "Test" | "Question" | "Drink" | "Food" | "User"
 *  - itemId (optional): number | string
 */
const EditLogModal = ({ open, onClose, user, itemType, itemId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set());

  const normalizedType = (itemType || '').trim();
  const typeMissing = !normalizedType;

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    getEditLogs(user)
      .then((res) => {
        // Expecting array response; if backend wraps, adjust here
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        setLogs(data);
        setError(null);
      })
      .catch((err) => {
        console.error('[EditLog] fetch failed', err);
        setError('Failed to load edit logs.');
      })
      .finally(() => setLoading(false));
  }, [open, user]);

  const filteredLogs = useMemo(() => {
    let list = Array.isArray(logs) ? logs : [];
    if (normalizedType) {
      list = list.filter((l) => String(l.item_type) === normalizedType);
    }
    if (itemId !== undefined && itemId !== null && itemId !== '') {
      list = list.filter((l) => String(l.item_id) === String(itemId));
    }
    // client-side sort desc by created_at/edit_date/id
    return list.slice().sort((a, b) => {
      const ad = new Date(a.created_at || a.edit_date || 0).getTime();
      const bd = new Date(b.created_at || b.edit_date || 0).getTime();
      if (bd !== ad) return bd - ad;
      return (b.id || 0) - (a.id || 0);
    });
  }, [logs, normalizedType, itemId]);

  const toggleRow = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const renderChanges = (changes) => {
    if (!changes) return null;
    const before = changes.before ?? null;
    const after = changes.after ?? null;
    const fields = Array.isArray(changes.fields_changed) ? changes.fields_changed : [];
    return (
      <div style={{ fontFamily: 'monospace', fontSize: 12, whiteSpace: 'pre-wrap' }}>
        <div><strong>Fields changed:</strong> {fields.length ? fields.join(', ') : '—'}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ opacity: 0.7, marginBottom: 4 }}>Before</div>
            <code>{JSON.stringify(before, null, 2)}</code>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ opacity: 0.7, marginBottom: 4 }}>After</div>
            <code>{JSON.stringify(after, null, 2)}</code>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} size="large">
      <Modal.Header>Edit Logs{normalizedType ? ` — ${normalizedType}${itemId ? ` #${itemId}` : ''}` : ''}</Modal.Header>
      <Modal.Content scrolling>
        {typeMissing && (
          <Message warning>
            <Message.Header>Item type required</Message.Header>
            <p>Please provide an <code>itemType</code> prop: "Test", "Question", "Drink", "Food", or "User".</p>
          </Message>
        )}
        {loading && <Loader active inline="centered" />}
        {error && <Message negative>{error}</Message>}
        {!loading && !error && !typeMissing && (
          <Table celled striped compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: 46 }}></Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Editor</Table.HeaderCell>
                <Table.HeaderCell>Restaurant</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <Table.Row>
                    <Table.Cell collapsing textAlign="center">
                      <Button icon basic size="mini" onClick={() => toggleRow(log.id)} aria-label="Toggle details">
                        <Icon name={expanded.has(log.id) ? 'chevron up' : 'chevron down'} />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{log.created_at || log.edit_date}</Table.Cell>
                    <Table.Cell>{log.action}</Table.Cell>
                    <Table.Cell>{log.item_type} #{log.item_id}</Table.Cell>
                    <Table.Cell>{log.editor_name_snapshot}</Table.Cell>
                    <Table.Cell>{log.restaurant_name || (log.restaurant ? log.restaurant.name : '')}</Table.Cell>
                  </Table.Row>
                  {expanded.has(log.id) && (
                    <Table.Row>
                      <Table.Cell colSpan={6}>{renderChanges(log.changes)}</Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              ))}
              {filteredLogs.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={6} textAlign="center" style={{ opacity: 0.7 }}>
                    No logs found for this selection.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditLogModal;