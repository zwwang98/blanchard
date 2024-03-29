import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import AutoComplete, { DataSourceType } from './autoComplete';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AutoComplete',
  component: AutoComplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AutoComplete>;

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const SearchGithubUserAutoComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items?.slice(0, 10)?.map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h6>Name: {itemWithGithub.value}</h6>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }

  return (
    <>
      <label>
        Search Github User
      </label>
      <AutoComplete 
        fetchSuggestions={handleFetch}
        onSelect={action('selected')}
        renderOption={renderOption}
      />
    </>
  )
}

interface GithubRepoProps {
  name: string;
  url: string;
  avatar_url: string;
}

export const SearchGithubRepoAutoComplete = () => {
  const handleFetch = (query: string) => {
    // https://docs.github.com/en/rest/reference/search#search-repositories
    return fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubRepoProps>
    return (
      <>
        <h6>Name: {itemWithGithub.name}</h6>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }

  return (
    <>
      <label>
        Search Github Repo
      </label>
      <AutoComplete 
        fetchSuggestions={handleFetch}
        onSelect={action('selected')}
        renderOption={renderOption}
      />
    </>
  )
}