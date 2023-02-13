import Head from "next/head";
import { useState, useEffect } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [characterPrompt, setCharacterPrompt] = useState("");

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log(characterPrompt, userInput);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ characterPrompt, userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSelection = (event) => {
    setSelectedContentType(event.target.value);
  };

  useEffect(() => {
    switch (selectedContentType) {
      case "Blog Post":
        setCharacterPrompt(
          `Act as Paul Graham and give no character introduction and write a Blog Post about the following title below. Please make sure the blog post goes in-depth on the topic and shows that the writer did their research.
          
          Title: `
        );
        break;

      case "Article":
        setCharacterPrompt(
          `Act as David Foster Wallace and give no character introduction and Write an Article about the Following title below. Please make sure the artcile goes in-depth on the topic and shows that the writer did their research.
          
          Title: `
        );
        break;

      case "Instagram Caption":
        setCharacterPrompt(
          `Act as a Social Media Infleuncer who Specialises in Going Viral and Create some Instagram Captions about the title below, please make sure the Instagram Captions show knowledge on the topic. Do not add anything on to title and create a caption from the title.
          
          
          Title: `
        );
        break;

      case "Tweets":
        setCharacterPrompt(
          `Act as Apple Founder Steve Jobs and give no character introduction and write some Tweets about the title below, Please make sure the Tweets are in-depth on the topic and shows that the writer did their research. Do not add anything on to title.
          
          Title: `
        );
        break;

      case "Facebook Post":
        setCharacterPrompt(
          `Act as Neil Patel and give no character introduction and Write some Facebook Posts about the title below, please make sure the Facebook Posts are in-depth on the topic and shows that the writer did their research. Do not add anything on to title.
          
          Title: `
        );
        break;

      case "Web Copy":
        setCharacterPrompt(
          `Act as Joanna Wiebe and give no character introduction and Write an in-depth WebCopy about the title below, please make sure the Web Copy goes in-depth on the topic and shows that the writer did their research. 

          Title: `
        );
        break;

      case "LinkedIn Post":
        setCharacterPrompt(
          `Act as Gary Vaynerchuk and give no character introduction and write an in-depth LinkedIn Post about the title below, please make sure the LinkedPost Post is in-depth on the topic and shows that the writer did their research.

          Title : `
        );
        break;

      case "TikTok Idea":
        setCharacterPrompt(
          `Act as a Social Media Infleuncer who Specialises in Going Viral now create some in-depth TikTok Ideas about the title below, please make sure the TikTok Ideas show knowledge on the topic. 
          
          Title: `
        );
        break;

      default:
        setCharacterPrompt("");
        break;
    }
  }, [selectedContentType]);

  return (
    <div className="root">
      <Head>
        <title>IntelliWrite | CheezyLeezy</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Unlock AI-Driven Content Creation Today</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Generate Professional Content Quickly and Easily with GPT-3
              Technology
            </h2>
          </div>
        </div>

        <div className="selection-container">
          <select value={selectedContentType} onChange={handleSelection}>
            <option value="">Select a content type</option>
            <option value="Blog Post">Blog Post</option>
            <option value="Article">Article</option>
            <option value="Instagram Caption">Instagram Caption</option>
            <option value="Facebook Post">Facebook Post</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Tweets">Tweets</option>
            <option value="TikTok Idea">TikTok Idea</option>
            <option value="Web Copy">Web Copy</option>
          </select>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="start typing here..."
            className="prompt-box"
            value={userInput}
            onChange={onUserInput}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
