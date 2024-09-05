import React from "react";
import BotResponse from "./BotResponse";

const IntroSection = () => {
  return (
    <div className="text-left p-5" id="introsection">
      <h1 className="text-[2rem] my-[1.66rem] font-bold pt-5 flex" >
        Introducing Talkbot
        <BotResponse response=" - The Ultimate AI Assistant" />
      </h1>
      <h2 className="my-[0.83rem]">
        A cutting-edge AI-powered app that provides instant answers to any
        question you may have. With Talkbot, you'll never be left searching for
        answers again. Whether you need information for school or work, or just
        want to know the latest news, Talkbot has you covered.
      </h2>
      Features:
      <ul className="my-4 list-square pl-10">
        <li>Instant answers to any question</li>
        <li>Deep learning technology that improves with usage</li>
        <li>Continuously Learning</li>
        <li>User-friendly interface</li>
        <li>Available 24/7</li>
      </ul>
      <p className="my-4">
        Say goodbye to endless searching and typing, and say hello to TalkBot,
        your personal AI assistant. Try it now and see for yourself how TalkBot
        can make your life easier.
      </p>
    </div>
  );
};

export default IntroSection;
