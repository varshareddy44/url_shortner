import React, { useState, useEffect } from "react";
import Service from "../utils/http";
import { Anchor, Table, Text, Button, Group, Modal, TextInput, Space, Container } from "@mantine/core";
import { IconEdit, IconTrash } from '@tabler/icons-react';

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newOriginalUrl, setNewOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async (pageNumber = 1) => {
    try {
      const response = await service.get(`user/my/urls?page=${pageNumber}&limit=${pageSize}`);
      console.log("Fetched data response:", response);
      setData(response.data || []);
      setTotalPages(response.pagination ? response.pagination.totalPages : 1);
      setPage(response.pagination ? response.pagination.currentPage : pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewTitle(item.title || '');
    setNewOriginalUrl(item.originalUrl);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setLoading(true);
    try {
      await service.patch(`shorturl/${editingItem.shortCode}`, {
        title: newTitle,
        originalUrl: newOriginalUrl
      });
      setEditModalOpen(false);
      getData(page);
    } catch (error) {
      console.error("Error updating URL:", error);
      // You might want to show some user feedback here.
    }
    setLoading(false);
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Are you sure you want to delete the URL with short code "${item.shortCode}"?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await service.delete(`shorturl/${item.shortCode}`);
      // If the current page has no more data after deletion, move back a page
      if (data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        getData(page);
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      // Show user feedback here if needed
    }
    setLoading(false);
  };

  return (
    <Container size="lg" mt="md">
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Title</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.shortCode}>
              <td>{item.title ? item.title : 'na'}</td>
              <td>
                <Anchor href={`${service.getBaseURL()}/c/${item.shortCode}`} target="_blank" rel="noopener noreferrer">
                  {`${service.getBaseURL()}/c/${item.shortCode}`}
                </Anchor>
              </td>
              <td>{item.originalUrl}</td>
              <td>
                <Group>
                  <Button onClick={() => handleEdit(item)}>
                    <IconEdit size={16} />
                  </Button>
                  <Button color="red" onClick={() => handleDelete(item)}>
                    <IconTrash size={16} />
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="center" mt="md">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </Group>
      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit URL">
        <TextInput
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter title"
        />
        <TextInput
          label="Original URL"
          value={newOriginalUrl}
          onChange={(e) => setNewOriginalUrl(e.target.value)}
          placeholder="Enter original URL"
        />
        <Space h="md" />
        <Group position="right">
          <Button variant="outline" onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={loading}>
            Save
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default MyUrls;
